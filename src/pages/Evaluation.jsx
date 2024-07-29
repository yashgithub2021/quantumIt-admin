import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    GetEvaluationForm,
    SetEvaluationForm,
    UpdateEvaluationForm,
    DeleteEvaluationForm,
    GetCategories,
    AddCategory,
    DeleteCategory
} from '../Redux/ApiCalls';
import { InputGroup, Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { FaEye } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import { generateRandomSixDigitNumber } from '../utils/function';
import CustomPagination from '../components/layout/CustomPagination';

const Evaluation = () => {
    const { isFetching, error, errMsg, evaluationform } = useSelector(state => state.eval);
    const { Categories, isFetchingCat } = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [keypoint, setKeypoint] = useState('');
    const [keyinsight, setKeyinsight] = useState('');
    const [validator, setValidator] = useState(0);
    const [confirmShow, setconfirmShow] = useState(false);
    const [verifyKey, setVerifyKey] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [Id, setId] = useState(null);
    const [categoryFormShow, setCategoryFormShow] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5; // Number of transactions per page

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setEditId(null);
        resetForm();
    };

    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        quote: '',
        readTime: '',
        blogImage: null,
        blogImage2: null,
    });

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            description: '',
            quote: '',
            readTime: '',
            blogImage: null,
            blogImage2: null,
        });
    };

    const handleDescriptionChange = (value) => {
        setFormData({ ...formData, description: value });
    };

    const handleFetchBlogs = async () => {
        await GetEvaluationForm(dispatch);
    };

    const handleFetchCategories = async () => {
        await GetCategories(dispatch);
        console.log(Categories)
    };

    const handleEdit = (blog) => {
        setEditMode(true);
        setEditId(blog.id);
        setFormData({
            title: blog.title,
            category: blog.category,
            description: blog.description,
            quote: blog.quote,
            readTime: blog.readTime,
        });
        handleShow();
    };

    const validateFormData = () => {
        const { title, category, description, quote, readTime } = formData;

        if (!title || !category || !description || !quote || !readTime) {
            toast.error("Please fill all the required fields.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateFormData()) return;
        const form = new FormData();

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item, index) => {
                        form.append(`${key}[${index}]`, item);
                    });
                } else {
                    form.append(key, formData[key]);
                }
            }
        }

        try {
            if (editMode && editId) {
                await UpdateEvaluationForm(dispatch, editId, form);
                if (!isFetching && !error) {
                    toast.success("Blog Updated Successfully", toastOptions);
                    handleClose();
                }
            } else {
                const blog = await SetEvaluationForm(dispatch, form);
                console.log('Response from SetEvaluationForm:', blog);
                console.log('State after dispatch:', isFetching, error, errMsg);

                if (!isFetching && !error) {
                    toast.success("Blog Added Successfully", toastOptions);
                    handleClose();
                }
            }
        } catch (e) {
            console.error('Error occurred:', e);
        }

        await handleFetchBlogs();
    };

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        console.log(validator)
        setconfirmShow(true);
        setId(id);
    };

    const handleDelete = async () => {
        if (confirmShow) {
            if (validator === verifyKey) {
                console.log(validator)
                await DeleteEvaluationForm(dispatch, Id);
                setconfirmShow(false);
                setId(null);
                setVerifyKey(0);
                if (!isFetching && !error) {
                    handleClose();
                    toast.success("Blog Deleted Successfully", toastOptions);
                    await handleFetchBlogs();
                }
            } else {
                toast.error("Key doesn't match", toastOptions);
            }
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory) {
            toast.error("Please enter a category name", toastOptions);
            return;
        }
        await AddCategory(dispatch, { name: newCategory });
        setNewCategory('');
        setCategoryFormShow(false);
        await handleFetchCategories();
    };

    const handleDeleteCategory = async (categoryId) => {
        await DeleteCategory(dispatch, categoryId);
        await handleFetchCategories();
    };

    useEffect(() => {
        handleFetchBlogs();
        handleFetchCategories();
    }, []);

    useEffect(() => {
        if (!isFetching && error) {
            toast.error(errMsg?.message, toastOptions);
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    const transactionList = evaluationform || [];
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactionList.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const pageHandler = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container-fluid'>
            <div className="my-3 pb-2 row" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }} >
                <div className="col-md-6">
                    <h3>Blogs</h3>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <Button variant="primary" onClick={handleShow}>
                        Add Blog
                    </Button>
                </div>
            </div>
            <div className='mb-3 overflow-x-scroll p-2 row w-100 flex justify-content-start align-items-center' style={{ marginLeft: '10px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Read Time</th>
                            <th>Image1</th>
                            <th>Image2</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            <tr>
                                <td colSpan="7" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            currentTransactions?.map((blog, i) => (
                                <tr key={blog.id}>
                                    <td>{i + 1 + (currentPage - 1) * transactionsPerPage}</td>
                                    <td>{blog.title}</td>
                                    <td>{blog.category}</td>
                                    <td>{blog.readTime}</td>
                                    <td>
                                        <img alt='img1' loading='lazy' width={130} height={100} src={blog.image} />
                                    </td>
                                    <td>
                                        <img alt='img2' loading='lazy' width={130} height={100} src={blog.image2} />
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(blog)} className='btn btn-primary'>
                                            <FaEye style={{ cursor: 'pointer', color: 'white', fontSize: '18px', margin: '0' }} />
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleVerify(blog.id)} className='btn btn-danger'>
                                            <MdDelete style={{ cursor: 'pointer', color: 'white', fontSize: '18px', margin: '0' }} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
                {transactionList.length > 0 && (
                    <CustomPagination
                        pages={Math.ceil(transactionList.length / transactionsPerPage)}
                        pageHandler={pageHandler}
                        curPage={currentPage}
                    />
                )}
            </div>

            {/* Modal for Blog Form */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Blog" : "Add Blog"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {Categories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <ReactQuill
                                value={formData.description}
                                onChange={handleDescriptionChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formQuote">
                            <Form.Label>Quote</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter quote"
                                value={formData.quote}
                                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formReadTime">
                            <Form.Label>Read Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter read time"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBlogImage">
                            <Form.Label>Blog Image 1</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFormData({ ...formData, blogImage: e.target.files[0] })}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBlogImage2">
                            <Form.Label>Blog Image 2</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFormData({ ...formData, blogImage2: e.target.files[0] })}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit}>
                            {editMode ? "Update Blog" : "Add Blog"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Confirmation Modal */}
            <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please enter the validation key to confirm deletion: <strong>{validator}</strong></p>
                    <Form.Control
                        type="number"
                        placeholder="Enter key"
                        value={verifyKey}
                        onChange={(e) => setVerifyKey(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setconfirmShow(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Category Form Modal */}
            <Modal show={categoryFormShow} onHide={() => setCategoryFormShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewCategory">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category name"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddCategory}>
                            Add Category
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Evaluation;
