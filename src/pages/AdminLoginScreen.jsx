import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner, } from "react-bootstrap";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useTitle } from "../components";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/error";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/ApiCalls";

export default function AdminLoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const { token, isFetching, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await login(dispatch, { email: username, password });
  };
  if (!isFetching && error) {
    toast.error("Network Error", toastOptions);
  }
  useEffect(() => {
    if (token) {
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  useTitle("Login");
  return (
    <Container fluid className="p-0 vh-100 f-center flex-column login-page">
      <div className="login-logo">
        <Link to="/" className="text-center">
          <b>Quantum IT Admin</b>
        </Link>
      </div>

      <Card className="login-box">
        <Card.Body>
          <p className="text-center">Sign in to start your session</p>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="text" className="input-group mb-3">
              <Form.Control
                placeholder="Email"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
            </Form.Group>
            <Form.Group controlId="password" className="input-group mb-3">
              <Form.Control
                placeholder="Password"
                type={check ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <InputGroup.Text onClick={() => setCheck((p) => !p)}>
                {!check ? (
                  <FaEye style={{ cursor: "pointer" }} />
                ) : (
                  <FaEyeSlash style={{ cursor: "pointer" }} />
                )}
              </InputGroup.Text>
            </Form.Group>
            <Row>
              {/* <Col sm={7} className="mb-sm-0 mb-3">
                <Form.Group controlId="remember">
                  <Form.Check
                    type="checkbox"
                    id="default-checkbox"
                    label="Remember Me"
                  />
                </Form.Group>
              </Col> */}
              <Col>
                {isFetching ? (
                  <Button type="submit" className="float-sm-end" disabled>
                    <Spinner animation="border" size="sm" />
                  </Button>
                ) : (
                  <Button type="submit" className="float-sm-end">
                    Sign In
                  </Button>
                )}
              </Col>
            </Row>
          </Form>

        </Card.Body>
      </Card>
    </Container>
  );
}
