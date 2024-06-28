import React, { useState } from 'react';
import { InputGroup, Card, Button, Modal, Table, Form, Tabs, Tab } from 'react-bootstrap';
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { GetAllClinics, CreateProject, RemoveProject, EditProject } from '../Redux/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { generateRandomSixDigitNumber } from '../utils/function';

const Clinic = () => {
    const formDataObj = new FormData();
    const dispatch = useDispatch();
    const [confirmShow, setConfirmShow] = useState();
    const [show, setShow] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [Id, setId] = useState(null);
    const [keypoint, setKeypoint] = useState('');
    const [keyinsight, setKeyinsight] = useState('');
    const [verifyKey, setVerifyKey] = useState(0);
    const [validator, setValidator] = useState(0);
    const [updateToId, setUpdateToId] = useState('');
    const [image, setFirstFile] = useState(null);
    const [imageTwo, setSecondFile] = useState(null);
    const [thirdFile, setThirdFile] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleFirstFileChange = (event) => {
        setFirstFile(event.target.files[0]);
    };
    const handleSecondFileChange = (event) => {
        setSecondFile(event.target.files[0]);
    };
    const handleThirdFileChange = (event) => {
        setThirdFile(event.target.files[0]);
    };

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        description2: '',
        clientName: '',
        date: '',
        image: '',
        imageTwo: '',
        liveLink: '',
        category: [],
        keyPoints: [],
        keyInsights: [],
        aboutProject: ''
    });

    const handleClose = () => {
        setFormData({
            name: '',
            description: '',
            description2: '',
            clientName: '',
            date: '',
            image: '',
            imageTwo: '',
            liveLink: '',
            category: [],
            keyPoints: [],
            keyInsights: [],
            aboutProject: ''
        });
        setShow(false);
    };

    const handleShow = () => {
        console.log(isEdit)
        setShow(true)
    };
    const { isFetching, error, clinics, errMsg } = useSelector(state => state.clinic);

    const handleGetAll = async () => {
        await GetAllClinics(dispatch);
    };

    React.useEffect(() => {
        handleGetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async () => {
        // formDataObj.append('firstFile', firstFile);
        // formDataObj.append('secondFile', secondFile);
        // formDataObj.append('thirdFile', thirdFile);
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
        if (isEdit) {
            await EditProject(dispatch, updateToId, formDataObj);
            setIsEdit(false)
        } else {
            await CreateProject(dispatch, formDataObj);
        }
        handleGetAll();
        handleClose();
    };

    const handleVerify = (id) => {
        setValidator(generateRandomSixDigitNumber());
        setConfirmShow(true);
        setId(id);
    };

    const handleDelete = async (id) => {
        if (confirmShow) {
            if (validator === verifyKey) {
                await RemoveProject(dispatch, { Id });
                if (!isFetching && !error) {
                    handleClose();
                    setTimeout(() => {
                        setConfirmShow(false);
                        handleGetAll();
                        setIsEdit(false);
                        setId(null);
                        setUpdateToId('');
                    }, 1000);
                }
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
            toast.error(errMsg?.message, toastOptions);
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    const filteredClinics = selectedCategory === 'All' ? clinics : clinics.filter(clinic => clinic.category.includes(selectedCategory));
    return (
        <div className='container-fluid'>
            <Card>
                <Card.Header>
                    <Button variant="primary" onClick={handleShow}>
                        Add Project
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={selectedCategory}
                        onSelect={(k) => setSelectedCategory(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="All" title="All">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Client Name</th>
                                        <th>Image 1</th>
                                        <th>Image 2</th>
                                        <th>Portfolio Image</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        filteredClinics?.map((clinic, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{clinic.name}</td>
                                                <td>
                                                    <ul>
                                                        {clinic.category.map((category, i) => (
                                                            <li key={i}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {clinic.clientName}
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.image} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.imageTwo} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic?.portfolioImage} />
                                                </td>
                                                <td onClick={() => {
                                                    handleShow(); setIsEdit(true); setFormData({
                                                        name: clinic.name,
                                                        description: clinic.description,
                                                        description2: clinic.description2,
                                                        clientName: clinic.clientName,
                                                        date: clinic.date,
                                                        image: clinic.image,
                                                        imageTwo: clinic.imageTwo,
                                                        liveLink: clinic.liveLink,
                                                        category: clinic.category,
                                                        keyPoints: clinic.keyPoints,
                                                        keyInsights: clinic.keyInsights,
                                                        aboutProject: clinic.aboutProject,
                                                    }); setUpdateToId(clinic._id);
                                                }} className='text-primary'>
                                                    <CiEdit style={{ color: 'green', fontSize: '30px' }} />
                                                </td>
                                                <td onClick={() => { handleDelete(clinic._id) }}>
                                                    <MdDelete style={{ color: 'red', fontSize: '30px' }} />
                                                </td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="Web App" title="Web App">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Client Name</th>
                                        <th>Image 1</th>
                                        <th>Image 2</th>
                                        <th>Portfolio Image</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        filteredClinics?.map((clinic, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{clinic.name}</td>
                                                <td>
                                                    <ul>
                                                        {clinic.category.map((category, i) => (
                                                            <li key={i}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {clinic.clientName}
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.image} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.imageTwo} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic?.portfolioImage} />
                                                </td>
                                                <td onClick={() => {
                                                    handleShow(); setIsEdit(true); setFormData({
                                                        name: clinic.name,
                                                        description: clinic.description,
                                                        description2: clinic.description2,
                                                        clientName: clinic.clientName,
                                                        date: clinic.date,
                                                        image: clinic.image,
                                                        imageTwo: clinic.imageTwo,
                                                        liveLink: clinic.liveLink,
                                                        category: clinic.category,
                                                        keyPoints: clinic.keyPoints,
                                                        keyInsights: clinic.keyInsights,
                                                        aboutProject: clinic.aboutProject,
                                                    }); setUpdateToId(clinic._id);
                                                }} className='text-primary'>
                                                    <CiEdit style={{ color: 'green', fontSize: '30px' }} />
                                                </td>
                                                <td onClick={() => { handleDelete(clinic._id) }}>
                                                    <MdDelete style={{ color: 'red', fontSize: '30px' }} />
                                                </td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="Mobile App" title="Mobile App">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Client Name</th>
                                        <th>Image 1</th>
                                        <th>Image 2</th>
                                        <th>Portfolio Image</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        filteredClinics?.map((clinic, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{clinic.name}</td>
                                                <td>
                                                    <ul>
                                                        {clinic.category.map((category, i) => (
                                                            <li key={i}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {clinic.clientName}
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.image} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.imageTwo} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic?.portfolioImage} />
                                                </td>
                                                <td onClick={() => {
                                                    handleShow(); setIsEdit(true); setFormData({
                                                        name: clinic.name,
                                                        description: clinic.description,
                                                        description2: clinic.description2,
                                                        clientName: clinic.clientName,
                                                        date: clinic.date,
                                                        image: clinic.image,
                                                        imageTwo: clinic.imageTwo,
                                                        liveLink: clinic.liveLink,
                                                        category: clinic.category,
                                                        keyPoints: clinic.keyPoints,
                                                        keyInsights: clinic.keyInsights,
                                                        aboutProject: clinic.aboutProject,
                                                    }); setUpdateToId(clinic._id);
                                                }} className='text-primary'>
                                                    <CiEdit style={{ color: 'green', fontSize: '30px' }} />
                                                </td>
                                                <td onClick={() => { handleDelete(clinic._id) }}>
                                                    <MdDelete style={{ color: 'red', fontSize: '30px' }} />
                                                </td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="Digital Marketing" title="Digital Marketing">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Client Name</th>
                                        <th>Image 1</th>
                                        <th>Image 2</th>
                                        <th>Portfolio Image</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        filteredClinics?.map((clinic, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{clinic.name}</td>
                                                <td>
                                                    <ul>
                                                        {clinic.category.map((category, i) => (
                                                            <li key={i}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {clinic.clientName}
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.image} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.imageTwo} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic?.portfolioImage} />
                                                </td>
                                                <td onClick={() => {
                                                    handleShow(); setIsEdit(true); setFormData({
                                                        name: clinic.name,
                                                        description: clinic.description,
                                                        description2: clinic.description2,
                                                        clientName: clinic.clientName,
                                                        date: clinic.date,
                                                        image: clinic.image,
                                                        imageTwo: clinic.imageTwo,
                                                        liveLink: clinic.liveLink,
                                                        category: clinic.category,
                                                        keyPoints: clinic.keyPoints,
                                                        keyInsights: clinic.keyInsights,
                                                        aboutProject: clinic.aboutProject,
                                                    }); setUpdateToId(clinic._id);
                                                }} className='text-primary'>
                                                    <CiEdit style={{ color: 'green', fontSize: '30px' }} />
                                                </td>
                                                <td onClick={() => { handleDelete(clinic._id) }}>
                                                    <MdDelete style={{ color: 'red', fontSize: '30px' }} />
                                                </td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="Website" title="Website">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Categories</th>
                                        <th>Client Name</th>
                                        <th>Image 1</th>
                                        <th>Image 2</th>
                                        <th>Portfolio Image</th>
                                        <th colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        filteredClinics?.map((clinic, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{clinic.name}</td>
                                                <td>
                                                    <ul>
                                                        {clinic.category.map((category, i) => (
                                                            <li key={i}>
                                                                {category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>
                                                    {clinic.clientName}
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.image} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic.imageTwo} />
                                                </td>
                                                <td>
                                                    <img alt='product' loading='lazy' width={130} height={100} src={clinic?.portfolioImage} />
                                                </td>
                                                <td onClick={() => {
                                                    handleShow(); setIsEdit(true); setFormData({
                                                        name: clinic.name,
                                                        description: clinic.description,
                                                        description2: clinic.description2,
                                                        clientName: clinic.clientName,
                                                        date: clinic.date,
                                                        image: clinic.image,
                                                        imageTwo: clinic.imageTwo,
                                                        liveLink: clinic.liveLink,
                                                        category: clinic.category,
                                                        keyPoints: clinic.keyPoints,
                                                        keyInsights: clinic.keyInsights,
                                                        aboutProject: clinic.aboutProject,
                                                    }); setUpdateToId(clinic._id);
                                                }} className='text-primary'>
                                                    <CiEdit style={{ color: 'green', fontSize: '30px' }} />
                                                </td>
                                                <td onClick={() => { handleDelete(clinic._id) }}>
                                                    <MdDelete style={{ color: 'red', fontSize: '30px' }} />
                                                </td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? 'Edit' : 'Add a'} Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form autoComplete='false'>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                value={formData.name}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                value={formData.description}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Description 2</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                                value={formData.description2}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Client name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                value={formData.clientName}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                value={formData?.date?.split("T")[0]}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Live Link</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                value={formData.liveLink}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                name='category'
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: Array.from(e.target.selectedOptions, option => option.value) })}>
                                <option value="Web App">Web App</option>
                                <option value="Mobile App">Mobile App</option>
                                <option value="Website">Website</option>
                                <option value="Digital Marketing">Digital Marketing</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Upload an Image 1</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Upload an Image 2</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, imageTwo: e.target.files[0] })} type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput3">
                            <Form.Label>Upload a Portfolio Image</Form.Label>
                            <Form.Control onChange={(e) => setFormData({ ...formData, portfolioImage: e.target.files[0] })} type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>Key Points</Form.Label>
                            <ol>
                                {formData?.keyPoints?.map((p, i) => (
                                    <li key={i}>
                                        {p}
                                        <i className='fa fa-times'
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => {
                                                const updatedKeyPoints = formData.keyPoints.filter((_, index) => index !== i);
                                                setFormData({ ...formData, keyPoints: updatedKeyPoints });
                                            }}
                                            style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                                        >
                                            X
                                        </i>
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
                                <Button
                                    onClick={() => {
                                        setFormData({ ...formData, keyPoints: [...formData.keyPoints, keypoint] });
                                        setKeypoint('');
                                    }}
                                    variant="outline-secondary"
                                    id="button-addon2"
                                >
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
                                        <i className='fa fa-times'
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => {
                                                const updatedKeyInsigts = formData.keyInsights.filter((_, index) => index !== i);
                                                setFormData({ ...formData, keyInsights: updatedKeyInsigts });
                                            }}
                                            style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                                        >
                                            X
                                        </i>
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
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor.ControlInput2">
                            <Form.Label>About Project</Form.Label>
                            <Form.Control
                                as="textarea"
                                onChange={(e) => setFormData({ ...formData, aboutProject: e.target.value })}
                                value={formData.aboutProject}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={isFetching} onClick={handleSubmit}>
                        {isFetching ? 'Please wait while we add your project' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={confirmShow} onHide={() => setConfirmShow(false)}>
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
                    <Button variant="secondary" onClick={() => setConfirmShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDelete()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Clinic;
