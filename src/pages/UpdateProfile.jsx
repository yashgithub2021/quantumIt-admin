import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';

const UpdateProfileModal = ({ isFetching, show, onHide, handleChange, handleSubmit, formData }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Save Changes
                        {
                            isFetching && <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                style={{ opacity: "0.6", marginInline: "5px" }}
                            />
                        }
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateProfileModal;
