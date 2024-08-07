import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { AddPlan, GetAllPlans, UpdatePlan, RemovePlan, CreatePlan } from '../Redux/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { generateRandomSixDigitNumber } from '../utils/function';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';

const Plans = () => {
    const [loading, setLoading] = useState(false);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [Id, setId] = useState(null);
    const [confirmShow, setconfirmShow] = useState();
    const [validator, setValidator] = useState(0);
    const [verifyKey, setVerifyKey] = useState(0);
    const [updateToId, setUpdateToId] = useState('');
    const [firstFile, setFirstFile] = useState(null);
    const handleFirstFileChange = (event) => {
        setFirstFile(event.target.files[0]);
    };
    const formDataObj = new FormData();
    const [formData, setFormData] = useState({
        name: '',
        stars: 0,
        message: '',
        designation: ''
    });
    const handleClose = () => { setShow(false); setconfirmShow(false); handleGetAll(); }
    const handleShow = () => setShow(true);
    const { isFetching, error, plans } = useSelector(state => state.plan);
    const handleGetAll = async () => {
        await GetAllPlans(dispatch);
    };
    React.useEffect(() => {
        handleGetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        formDataObj.append('firstFile', firstFile);
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
        for (let [key, value] of formDataObj.entries()) {
            console.log(`${key}: ${value}`);
        }

        if (isEdit) {
            await UpdatePlan(dispatch, formDataObj, updateToId);
        } else {
            // const { data } = await axiosInstance.post("/api/feedback/feedback", formDataObj, {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('token')}`,
            //     }
            // });
            // console.log(data);
            await CreatePlan(dispatch, formDataObj);
        }

        setLoading(false);
        handleClose();
    };

    const handleEdit = (plan) => {
        setFormData({
            name: plan.name,
            stars: plan.stars,
            message: plan.message,
            designation: plan.designation
        });
        setIsEdit(true);
        setUpdateToId(plan._id);
        handleShow();
    };

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        setconfirmShow(true);
        setId(id);
    };

    const handleDelete = async (id) => {
        if (confirmShow) {
            if (validator === verifyKey) {
                await RemovePlan(dispatch, { Id });
            } else {
                handleClose();
                return toast.error("Key does'nt match", toastOptions);
            }
            if (!Id) {
                handleClose();
                return toast.error("Fields are emptys", toastOptions);
            }
            if (!isFetching && !error) {
                console.log(error);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    return (
        <div className='container-fluid'>
            <Card>
                <Card.Header>
                    <Button variant="primary" onClick={handleShow}>
                        Add Feedback
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Profile Image</th>
                                <th>Name</th>
                                <th>Designation</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? "Loading..." :
                                plans?.map((plan, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td> <img loading='lazy' src={plan.profileImg} alt='profile' width={100} height={100} /> </td>
                                        <td>{plan.name}</td>
                                        <td>{plan.designation}</td>
                                        <td>
                                            <button onClick={() => handleEdit(plan)} className='btn btn-primary'>
                                                <FaEye style={{ cursor: 'pointer', color: 'white', fontSize: '18px', margin: '0' }} />
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(plan._id)} className='btn btn-danger'>
                                                <MdDelete style={{ cursor: 'pointer', color: 'white', fontSize: '18px', margin: '0' }} />
                                            </button>
                                        </td>
                                    </tr>)}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit" : 'Create'} Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false'>
                        <Form.Group className="mb-3" controlId="form.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={formData?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.ControlInput2">
                            <Form.Label>Stars</Form.Label>
                            <Form.Control type="number" value={formData?.stars} onChange={(e) => setFormData({ ...formData, stars: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.ControlInput1">
                            <Form.Label>Message</Form.Label>
                            <Form.Control type="text" value={formData?.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.ControlInput1">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" value={formData?.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="form.ControlInput1">
                            <Form.Label>File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFirstFileChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button disabled={loading} variant="primary" onClick={handleSubmit}>
                        {loading ? 'Please wait...' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Do you really want it.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Type <strong>{validator}</strong> to confirm your action!</Form.Label>
                            <Form.Control
                                type="number"
                                autoFocus
                                onChange={(e) => setVerifyKey(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setconfirmShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => handleDelete()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default Plans;
