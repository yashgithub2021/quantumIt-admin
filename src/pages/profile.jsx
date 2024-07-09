import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { GetProfile, updateProfile } from '../Redux/ApiCalls'; // Adjust the path as necessary
import LoadingBox from '../components/layout/LoadingBox'; // Ensure you have this component
import MessageBox from '../components/layout/MessageBox'; // Ensure you have this component
import UpdateProfile from './UpdateProfile'; // Ensure you have this component

const Profile = () => {
    const dispatch = useDispatch();
    const { userInfo, isFetching, error, errMsg } = useSelector(state => state.auth);
    const [modalShow, setModalShow] = useState(false);
    const [formData, setFormData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || ''
    });

    useEffect(() => {
        if (userInfo) {
            setFormData({
                name: userInfo.name,
                email: userInfo.email
            });
        }
    }, [userInfo]);

    const handleFetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            await GetProfile(dispatch);
        }
    }



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            console.log(formData)
            await updateProfile(dispatch, formData);
        }
        setModalShow(false);
    };
    useEffect(() => {
        handleFetchProfile()
    }, []);
    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            exit={{ x: "100%" }}
        >
            <Container fluid className="py-3">
                {isFetching ? (
                    <LoadingBox />
                ) : error ? (
                    <MessageBox variant="danger">{errMsg}</MessageBox>
                ) : (
                    <>
                        <Card>
                            <Card.Header>
                                <Card.Title>
                                    {isFetching ? <Skeleton /> : `Admin Profile`}
                                </Card.Title>
                                <div className="card-tools">
                                    <FaEdit
                                        style={{ color: "blue" }}
                                        onClick={() => setModalShow(true)}
                                    />
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={6}>
                                        <p className="mb-0">
                                            <strong>Name</strong>
                                        </p>
                                        <p>{isFetching ? <Skeleton /> : userInfo?.name}</p>
                                    </Col>
                                    <Col md={6}>
                                        <p className="mb-0">
                                            <strong>Email</strong>
                                        </p>
                                        <p>{isFetching ? <Skeleton /> : userInfo?.email}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>

                        <UpdateProfile
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            formData={formData}
                        />
                    </>
                )}
            </Container>
        </motion.div>
    );
};

export default Profile;
