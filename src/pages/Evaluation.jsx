import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetEvaluationForm, SetEvaluationForm, UpdateEvaluationForm, DeleteEvaluationForm } from '../Redux/ApiCalls';
import { InputGroup, Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { generateRandomSixDigitNumber } from '../utils/function';

const Evaluation = () => {
    const { isFetching, error, errMsg, evaluationform } = useSelector(state => state.eval);
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
        detailedInsights: '',
        quote: '',
        keyPoints: [],
        keyInsights: [],
        readTime: '',
        authorName: '',
        authorDesignation: '',
        authorAbout: '',
        facebook: '',
        twitter: '',
        instagram: '',
        blogImage: null,
        authorProfile: null,
    });

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            description: '',
            detailedInsights: '',
            quote: '',
            keyPoints: [],
            keyInsights: [],
            readTime: '',
            authorName: '',
            authorDesignation: '',
            authorAbout: '',
            facebook: '',
            twitter: '',
            instagram: '',
            blogImage: null,
            authorProfile: null,
        });
    };

    const handleFetchBlogs = async () => {
        await GetEvaluationForm(dispatch);
    };

    const handleEdit = (blog) => {
        setEditMode(true);
        setEditId(blog._id);
        setFormData({
            title: blog.title,
            category: blog.category.join(', '), // Convert array to comma-separated string
            description: blog.description,
            detailedInsights: blog.detailedInsights,
            quote: blog.quote,
            keyPoints: blog.keyPoints,
            keyInsights: blog.keyInsights,
            readTime: blog.readTime,
            authorName: blog.author.authorName,
            authorDesignation: blog.author.designation,
            authorAbout: blog.author.about,
            facebook: blog.author.socialMedia?.facebook || '', // Handle optional chaining
            twitter: blog.author.socialMedia?.twitter || '', // Handle optional chaining
            instagram: blog.author.socialMedia?.instagram || '', // Handle optional chaining
        });
        handleShow();
    };

    const handleSubmit = async () => {
        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        if (editMode && editId) {
            await UpdateEvaluationForm(dispatch, editId, form);
            if (!isFetching && !error) {
                toast.success("Blog Updated Successfully", toastOptions);
                handleClose();
            }
        } else {
            await SetEvaluationForm(dispatch, form);
            if (!isFetching && !error) {
                toast.success("Blog Added Successfully", toastOptions);
                handleClose();
            }
        }
        await handleFetchBlogs();
    };

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        setconfirmShow(true);
        setId(id);
    }

    const handleDelete = async () => {
        if (confirmShow) {
            if (validator === verifyKey, 10) {
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
    }

    useEffect(() => {
        handleFetchBlogs();
    }, []);

    React.useEffect(() => {
        if (!isFetching && error) {
            toast.error(errMsg?.message, toastOptions);
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

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
            <div className='mb-3 p-2 row w-100 flex justify-content-start align-items-center' style={{ marginLeft: '10px' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Read Time</th>
                            <th>Author</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isFetching ? (
                            <tr>
                                <td colSpan="7" className="text-center">Loading...</td>
                            </tr>
                        ) : (
                            evaluationform?.map((blog, i) => (
                                <tr key={blog._id}>
                                    <td>{i + 1}</td>
                                    <td>{blog.title}</td>
                                    <td>
                                        <ul>
                                            {blog.category.map((cat, j) => (
                                                <li key={j}>
                                                    {cat}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>{blog.readTime}</td>
                                    <td>{blog.author.authorName}</td>
                                    <td>
                                        <CiEdit onClick={() => handleEdit(blog)} style={{ cursor: 'pointer', color: 'green', fontSize: '30px' }} />
                                    </td>
                                    <td>
                                        <MdDelete onClick={() => handleVerify(blog._id)} style={{ cursor: 'pointer', color: 'red', fontSize: '30px' }} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Blog' : 'Add Blog'}</Modal.Title>
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
                                type="text"
                                placeholder="Enter categories separated by commas"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value.split(', ') })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDetailedInsights">
                            <Form.Label>Detailed Insights</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter detailed insights"
                                value={formData.detailedInsights}
                                onChange={(e) => setFormData({ ...formData, detailedInsights: e.target.value })}
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
                        <Form.Group controlId="formKeyPoints">
                            <Form.Label>Key Points</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter a key point"
                                    value={keypoint}
                                    onChange={(e) => setKeypoint(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => {
                                    setFormData({ ...formData, keyPoints: [...formData.keyPoints, keypoint] });
                                    setKeypoint('');
                                }}>
                                    Add
                                </Button>
                            </InputGroup>
                            <ul>
                                {formData.keyPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </Form.Group>
                        <Form.Group controlId="formKeyInsights">
                            <Form.Label>Key Insights</Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter a key insight"
                                    value={keyinsight}
                                    onChange={(e) => setKeyinsight(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => {
                                    setFormData({ ...formData, keyInsights: [...formData.keyInsights, keyinsight] });
                                    setKeyinsight('');
                                }}>
                                    Add
                                </Button>
                            </InputGroup>
                            <ul>
                                {formData.keyInsights.map((insight, index) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
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
                        <Form.Group controlId="formAuthorName">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author name"
                                value={formData.authorName}
                                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthorDesignation">
                            <Form.Label>Author Designation</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter author designation"
                                value={formData.authorDesignation}
                                onChange={(e) => setFormData({ ...formData, authorDesignation: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthorAbout">
                            <Form.Label>About Author</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter about author"
                                value={formData.authorAbout}
                                onChange={(e) => setFormData({ ...formData, authorAbout: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFacebook">
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Facebook link"
                                value={formData.facebook}
                                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTwitter">
                            <Form.Label>Twitter</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Twitter link"
                                value={formData.twitter}
                                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formInstagram">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Instagram link"
                                value={formData.instagram}
                                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBlogImage">
                            <Form.Label>Blog Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFormData({ ...formData, blogImage: e.target.files[0] })}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthorProfile">
                            <Form.Label>Author Profile Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFormData({ ...formData, authorProfile: e.target.files[0] })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this blog?</p>
                    <p>Type <strong>{validator}</strong> to confirm your action!</p>
                    <Form.Control
                        type="number"
                        value={verifyKey}
                        onChange={(e) => setVerifyKey(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setconfirmShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Confirm Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Evaluation;
