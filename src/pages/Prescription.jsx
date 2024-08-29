/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { GetPrescriptionForm, CreateFaq, RemoveFaq, UpdateFaq } from '../Redux/ApiCalls';
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axiosUtil';
import { generateRandomSixDigitNumber } from '../utils/function';
import { EditForm, ViewButton } from '../components';
import { useNavigate } from 'react-router-dom';



const Prescription = () => {
    const { isFetching, error, errMsg, prescriptionform, isSuccess } = useSelector(state => state.pres);
    console.log(prescriptionform)
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Id, setId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [verifyKey, setVerifyKey] = useState(0);
    const [validator, setValidator] = useState(0);
    const [confirmShow, setconfirmShow] = useState();
    const [keypoint, setKeypoint] = useState('');
    const [keyinsight, setKeyinsight] = useState('');
    const [formData, setFormData] = useState({
        question: "",
        // description: "",
        // clientName: "",
        // keyPoints: [],
        // keyInsights: [],
        answer: "",
    });
    const [info, setinfo] = useState({
        question: "",
        answer: ""
    })
    const inputFieldProps = [
        {
            type: "text",
            col: 12,
            props: {
                name: "question",
                label: "Question",
                required: true,
                placeholder: "Enter Question",
            },
        },
        {
            type: "text",
            col: 12,
            row: 12,
            props: {
                name: "answer",
                label: "Answer",
                required: true,
                placeholder: "Enter Answer",
            },
        },
    ]
    const handleFetchForm = async () => {
        await GetPrescriptionForm(dispatch);
    }
    const handleSubmit = async () => {
        console.log(formData);
        await CreateFaq(dispatch, formData);
        setTimeout(() => {
            handleFetchForm();
        }, 1000);
        if (!isFetching && !error) {
            toast.success("Form Added Successfully", toastOptions);
            handleClose();
        }
    }
    const editSubmitHandle = async (e) => {
        e.preventDefault()
        console.log(info, Id)
        await UpdateFaq(dispatch, Id, info)
        setTimeout(() => {
            handleFetchForm();
        }, 1000);
    }
    const handleEdit = (i) => {
        setModalShow(true)
        setinfo({
            question: prescriptionform[i].question,
            answer: prescriptionform[i].answer
        })
    }
    useEffect(() => {
        handleFetchForm();
    }, []);

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        setconfirmShow(true);
        setId(id)
    }

    const handleDelete = async (id) => {
        if (confirmShow) {
            if (validator === verifyKey) {
                await RemoveFaq(dispatch, { Id });
                setconfirmShow(false)
            } else {
                handleClose();
                return toast.error("Key does'nt match", toastOptions);
            }
            if (!Id) {
                handleClose();
                return toast.error("Fields are emptys", toastOptions);
            }
            if (!isFetching && !error) {
                handleClose();
                setTimeout(() => {
                    handleFetchForm();
                    setIsEdit(false);
                    setId(null);
                    // setUpdateToId('');
                }, 1000);
            }
        } else {
            handleVerify(id);
        }
    }

    React.useEffect(() => {
        if (!isFetching && error) {
            toast.error(errMsg?.message, toastOptions);
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching])

    return (
        <div className='container-fluid'>
            <div className="my-3 pb-2 row" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }} >
                <div className="col-md-6">
                    <h3> <span className='text-danger'>F</span>requently <span className='text-danger'>A</span>sked <span className='text-danger'>Q</span>uestions</h3>
                </div>
                <div className="col-md-6 d-flex justify-content-end align-items-center">
                    <Button variant="primary" onClick={handleShow}>
                        Add F.A.Q.
                    </Button>
                </div>
            </div>
            <div className='mb-3 p-4 row w-100 flex justify-content-start align-items-center' style={{ overflowX: 'scroll' }}>
                {
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                {/* <th>Client Name</th> */}
                                {/* <th>Description</th> */}
                                {/* <th>Key Insights</th> */}
                                {/* <th>Key Points</th> */}
                                <th>Question</th>
                                <th>Answer</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isFetching ? "Loading..." :
                                prescriptionform?.map((plan, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        {/* <td>{plan.clientName}</td> */}
                                        {/* <td>{plan.description}</td> */}
                                        {/* <td>
                                            <ul>
                                                {plan.keyPoints.map((key, i) => (
                                                    <li key={i}>
                                                        {key}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td> */}
                                        {/* <td>
                                            <ul>
                                                {plan.keyInsights.map((key, i) => (
                                                    <li key={i}>
                                                        {key}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td> */}
                                        <td>
                                            {plan.question}
                                        </td>
                                        <td>
                                            {plan.answer}
                                        </td>
                                        <td>
                                            <CiEdit onClick={() => { setId(plan.id); handleEdit(i) }} />
                                        </td>
                                        <td>
                                            <MdDelete onClick={() => handleDelete(plan.id)} style={{ color: 'red', fontSize: '30px' }} />
                                        </td>
                                    </tr>)}
                        </tbody>
                    </Table>
                }
            </div>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false'>
                        {/* <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Client name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                value={formData.clientName}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Key Points</Form.Label>
                            <ol>
                                {formData?.keyPoints?.map((p, i) => (
                                    <li key={i}>
                                        {p}
                                    </li>
                                ))}
                            </ol>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Key point"
                                    aria-label="Key point"
                                    onChange={(e) => setKeypoint(e.target.value)}
                                    value={keypoint}
                                    autoFocus
                                />
                                <Button onClick={() => { setFormData({ ...formData, keyPoints: [...formData.keyPoints, keypoint] }); setKeypoint(''); }} variant="outline-secondary" id="button-addon2">
                                    Add
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Key Insights</Form.Label>
                            <ol>
                                {formData?.keyInsights?.map((p, i) => (
                                    <li key={i}>
                                        {p}
                                    </li>
                                ))}
                            </ol>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Key Insights"
                                    aria-label="Key Insight"
                                    onChange={(e) => setKeyinsight(e.target.value)}
                                    value={keyinsight}
                                    autoFocus
                                />
                                <Button onClick={() => { setFormData({ ...formData, keyInsights: [...formData.keyInsights, keyinsight] }); setKeyinsight(''); }} variant="outline-secondary" id="button-addon2">
                                    Add
                                </Button>
                            </InputGroup>
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                value={formData.question}
                                autoFocus
                            />
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="textarea"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                value={formData.description}
                                autoFocus
                            />
                        </Form.Group> */}
                        <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Answer</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                value={formData.answer}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={confirmShow} onHide={() => setconfirmShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Do you really want it.</Modal.Title>
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
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <EditForm title='Edit FAQ'
                data={info}
                setData={setinfo}
                inputFieldProps={inputFieldProps}
                submitHandler={editSubmitHandle}
                successMessage='FAQ Updated Successfuly!'
                show={modalShow}
                reducerProps={{
                    loadingUpdate: isFetching, success: isSuccess, errMsg
                }}
                onHide={() => setModalShow(false)}
            />

        </div>
    )
}

export default Prescription