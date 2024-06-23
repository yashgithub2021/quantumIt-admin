import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { GetAllDoctors, AddDoctor, RemoveDoctor, UpdateDoctor } from '../Redux/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { generateRandomSixDigitNumber } from '../utils/function';
import { MdDelete } from 'react-icons/md';

const Contributor = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [confirmShow, setconfirmShow] = useState(false);
    const [validator, setValidator] = useState(0);
    const [verifyKey, setVerifyKey] = useState(0);
    const [isEdit, setIsEdit] = useState(false);
    const [Id, setId] = useState(null);
    const [updateToId, setUpdateToId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        profileImage: null,
        numberOfArticles: 0
    });

    const { isFetching, error, doctors } = useSelector(state => state.doc);

    const handleClose = () => { setShow(false); setconfirmShow(false); };
    const handleShow = () => { setShow(true); };

    const handleGetAll = async () => {
        await GetAllDoctors(dispatch);
    };

    React.useEffect(() => {
        handleGetAll();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage' && files) {
            setFormData({ ...formData, profileImage: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.profileImage || !formData.numberOfArticles) {
            handleClose();
            return toast.error(` ${!formData.name ? "Name, " : ""} ${!formData.profileImage ? "Profile Image, " : ''} ${!formData.numberOfArticles ? "Number of Articles, " : ''} fields are empty`, toastOptions);
        }

        const formDataObj = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (Array.isArray(formData[key])) {
                    formData[key].forEach((item, index) => {
                        formDataObj.append(`${key}[${index}]`, item);
                    });
                } else {
                    formDataObj.append(key, formData[key]);
                }
            }
        }

        try {
            if (isEdit) {
                await UpdateDoctor(dispatch, formDataObj, updateToId);
            } else {
                await AddDoctor(dispatch, formDataObj);
            }
            handleClose();
            setTimeout(() => {
                handleGetAll();
                setIsEdit(false);
                setId(null);
                setUpdateToId('');
            }, 1000);
            toast.success("Operation successful", toastOptions);
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred";
            toast.error(`Error: ${errorMessage}`, toastOptions);
            setFormData({
                name: '',
                profileImage: null,
                numberOfArticles: 0
            });
        }
    };

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        setconfirmShow(true);
        setId(id);
    };

    const handleDelete = async (id) => {
        if (confirmShow) {
            if (validator === verifyKey) {
                await RemoveDoctor(dispatch, { Id });
            } else {
                handleClose();
                return toast.error("Key doesn't match", toastOptions);
            }
            if (!Id) {
                handleClose();
                return toast.error("Fields are empty", toastOptions);
            }
            if (!isFetching && !error) {
                handleClose();
                setTimeout(() => {
                    handleGetAll();
                    setIsEdit(false);
                    setId(null);
                    setUpdateToId('');
                }, 1000);
            }
        } else {
            handleVerify(id);
        }
    };

    React.useEffect(() => {
        if (!isFetching && error) {
            handleClose();
        }
    }, [isFetching]);

    return (
        <div className='container-fluid'>
            <Card>
                <Card.Header>
                    <Button variant="primary" onClick={handleShow}>
                        Add Contributor
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Profile picture</th>
                                <th>Number of articles</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? "Loading..." :
                                doctors?.map((doc, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{doc.name}</td>
                                        <td>
                                            <img alt={doc.name} width={100} height={100} src={doc.profileImage} />
                                        </td>
                                        <td>{doc.numberOfArticles}</td>
                                        <td onClick={() => {
                                            handleShow(); setIsEdit(true); setFormData({
                                                name: doc.name,
                                                profileImage: doc.profileImage,
                                                numberOfArticles: doc.numberOfArticles
                                            }); setUpdateToId(doc._id)
                                        }} className='text-primary'><CiEdit style={{ color: 'green', fontSize: '30px' }} /> </td>
                                        <td onClick={() => { handleDelete(doc._id) }} className='text-danger'><MdDelete style={{ color: 'red', fontSize: '30px' }} /> </td>
                                    </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit' : 'Add a'} Contributor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false' onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Profile Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="profileImage"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput3">
                            <Form.Label>Number of Articles</Form.Label>
                            <Form.Control
                                type="number"
                                name="numberOfArticles"
                                onChange={handleChange}
                                value={formData.numberOfArticles}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" disabled={isFetching}>
                                {isFetching ? "Working" : "Submit"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you really want to delete?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Type <strong>{validator}</strong> to confirm your action!</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                onChange={(e) => setVerifyKey(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setconfirmShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Contributor;
