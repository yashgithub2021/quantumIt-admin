import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { GetAllSlots } from '../Redux/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axiosUtil';

const Slots = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const dispatch = useDispatch();
    const [queriesFetched, setQueriesFetched] = useState([]);
    const { isFetching, slots } = useSelector(state => state.slot);
    const handleGetAll = async () => {
        await GetAllSlots(dispatch);
        setQueriesFetched(slots);
    };
    React.useEffect(() => {
        handleGetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const GetAllJoinUs = async () => {
        const { data } = await axiosInstance.get("/api/contactus/contactus", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
                type: 'join_us'
            }
        });
        setQueriesFetched(data.queries);
    };
    const [key, setKey] = useState('contact_us_queries');
    return (
        <Tabs
            defaultActiveKey="contact-us-queries"
            id="uncontrolled-tab-example"
            className="m-3"
            activeKey={key}
            onSelect={(k) => { setKey(k); k === 'join_us' ? GetAllJoinUs() : handleGetAll() }}
        >
            <Tab eventKey="contact_us_queries" title="Contact Us Queries">
                <div className='container-fluid'>
                    <Card>
                        {/* <Card.Header>
                    <Button variant="primary" onClick={handleShow} disabled>
                        Add Query
                    </Button>
                </Card.Header> */}
                        <Card.Body style={{ overflowX: 'scroll' }}>
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company Name</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        slots?.map((doc, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{doc.firstName} {doc.lastName}</td>
                                                <td>{doc.email}</td>
                                                <td>{doc.companyName}</td>
                                                <td>{doc?.message}</td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Tab>
            <Tab eventKey="join_us" title="Join Us" onLoad={() => GetAllJoinUs()}>
                <div className='container-fluid'>
                    <Card>
                        {/* <Card.Header>
                    <Button variant="primary" onClick={handleShow} disabled>
                        Add Query
                    </Button>
                </Card.Header> */}
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Company Name</th>
                                        <th>Message</th>
                                        <th>Resume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? "Loading..." :
                                        queriesFetched?.map((doc, i) =>
                                            <tr key={i}>
                                                <td>{i + 1}</td>
                                                <td>{doc.firstName} {doc.lastName}</td>
                                                <td>{doc.email}</td>
                                                <td>{doc.companyName}</td>
                                                <td>{doc?.message}</td>
                                                <td>{doc?.resume}</td>
                                            </tr>)}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            </Tab>
            {/* <Tab eventKey="contact" title="Contact" disabled>
                Tab content for Contact
            </Tab> */}
        </Tabs>
    )
}

export default Slots