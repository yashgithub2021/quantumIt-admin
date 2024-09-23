import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { GetAllSlots } from '../Redux/ApiCalls';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosUtil';
import CustomPagination from '../components/layout/CustomPagination';
import RealEstateTab from './RealEstateTab';


const Slots = () => {
    const dispatch = useDispatch();
    const { isFetching, slots } = useSelector(state => state.slot);
    const [queriesFetched, setQueriesFetched] = useState([]);
    const [key, setKey] = useState('contact_us_queries');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        handleGetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGetAll = async () => {
        await GetAllSlots(dispatch);
        setQueriesFetched(slots);
    };

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


    const pageHandler = (pageNumber) => setCurrentPage(pageNumber);

    const getCurrentData = (data) => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        return data.slice(indexOfFirstItem, indexOfLastItem);
    };

    const columnWidth = '12.5%'; // Set a fixed width for each column

    return (
        <Tabs
            defaultActiveKey="contact_us_queries"
            id="uncontrolled-tab-example"
            className="m-3"
            activeKey={key}
            onSelect={(k) => {
                setKey(k);
                setCurrentPage(1);
                k === 'join_us' ? GetAllJoinUs() : handleGetAll();
            }}
        >
            <Tab eventKey="contact_us_queries" title="Contact Us Queries">
                <div className='container-fluid'>
                    <Card>
                        <Card.Body style={{ overflowX: 'scroll' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>#</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Name</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Email</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Company Name</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Message</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>IP Address</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">Loading...</td>
                                        </tr>
                                    ) : (
                                        getCurrentData(slots)?.map((doc, i) => (
                                            <tr key={i}>
                                                <td style={{ width: columnWidth }}>{i + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                <td style={{ width: columnWidth }}>{doc.firstName} {doc.lastName}</td>
                                                <td style={{ width: columnWidth }}>{doc.email}</td>
                                                <td style={{ width: columnWidth }}>{doc.companyName}</td>
                                                <td style={{ width: columnWidth }}>{doc.message}</td>
                                                <td style={{ width: columnWidth }}>{doc.ip_address}</td>
                                                <td style={{ width: columnWidth }}>{doc.location}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <CustomPagination
                                pages={Math.ceil(slots.length / itemsPerPage)}
                                pageHandler={pageHandler}
                                curPage={currentPage}
                            />
                        </Card.Footer>
                    </Card>
                </div>
            </Tab>
            <Tab eventKey="join_us" title="Join Us">
                <div className='container-fluid'>
                    <Card>
                        <Card.Body style={{ overflowX: 'scroll' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>#</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Name</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Email</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Company Name</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Message</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Resume</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>IP Address</th>
                                        <th style={{ width: columnWidth, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetching ? (
                                        <tr>
                                            <td colSpan="8" className="text-center">Loading...</td>
                                        </tr>
                                    ) : (
                                        getCurrentData(queriesFetched)?.map((doc, i) => (
                                            <tr key={i}>
                                                <td style={{ width: columnWidth }}>{i + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                <td style={{ width: columnWidth }}>{doc.firstName} {doc.lastName}</td>
                                                <td style={{ width: columnWidth }}>{doc.email}</td>
                                                <td style={{ width: columnWidth }}>{doc.companyName}</td>
                                                <td style={{ width: columnWidth }}>{doc.message}</td>
                                                <td style={{ width: columnWidth }}>{doc.resume}</td>
                                                <td style={{ width: columnWidth }}>{doc.ip_address}</td>
                                                <td style={{ width: columnWidth }}>{doc.location}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <CustomPagination
                                pages={Math.ceil(queriesFetched.length / itemsPerPage)}
                                pageHandler={pageHandler}
                                curPage={currentPage}
                            />
                        </Card.Footer>
                    </Card>
                </div>
            </Tab>
            <Tab eventKey="real_estate_queries" title="Real Estate Queries">
                <RealEstateTab />
            </Tab>
        </Tabs>
    );
};

export default Slots;
