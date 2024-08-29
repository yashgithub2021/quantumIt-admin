/**
 * @file This file contains reusable form components and a custom form component.
 * The custom form component renders a form with various input fields based on the provided props.
 * It also handles form submission, displays success and error messages, and redirects after successful        submission.
 * The file exports the custom form component and other form input components.
 * @requires React
 * @requires react-bootstrap
 * @requires react-toastify
 * @requires react-router-dom
 */

import React, { useEffect } from "react";
import {
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Button,
  Modal,
  Container,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../utils/error";
// import { clearErrors } from '../../states/actions';
import { useNavigate } from "react-router-dom";
import MotionDiv from "./MotionDiv";
import SubmitButton from "./SubmitButton";

/**
 * Text input component for the form.
 * @param {Object} props - Props for the text input component.
 * @param {string} props.label - Label for the text input.
 * @returns {JSX.Element} Text input component for different type (date/number/text).
 * 
 * @example
 * <TextInput
      label="Check Box"
      type="date"
      onChange={changeHanlder}
      value={value}
    />
 */

const TextInput = (props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} />
    </Form.Group>
  );
};
const DateInput = (props) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{props.label}</Form.Label>
      <Form.Control {...props} type="date" />
    </Form.Group>
  );
};
/**
 * Checkbox input component for the form.
 * @param {Object} props - Props for the checkbox input component.
 * @param {string} props.checklabel - Label for the checkbox input.
 * @returns {JSX.Element} Checkbox input component.
 * 
 * @example
 * <CheckInput
      checklabel="Check Box"
      onChange={changeHanlder}
      value={value}
    />
 */
const CheckInput = (props) => {
  // console.log({ props });
  return (
    <Form.Group className="mb-3">
      {props.checklabel && <Form.Label>{props.checklabel}</Form.Label>}
      <Form.Check className="checkbox" type="checkbox" {...props} />
    </Form.Group>
  );
};

/**
 * Radio input component for the form.
 * @param {Object} props - Props for the radio input component.
 * @param {string} props.checklabel - Label for the radio input.
 * @returns {JSX.Element} Radio input component.
 * 
 * @example
 * <RadioInput
      checklabel="Check Box"
      onChange={changeHanlder}
      value={value}
    />
 */
const RadioInput = (props) => {
  return (
    <Form.Group className="mb-3">
      {props.labelAbove && <Form.Label>{props.labelAbove}</Form.Label>}
      <Form.Check type="radio" {...props} />
    </Form.Group>
  );
};

/**
 * Select input component for the form.
 * @param {Object} props - Props for the select input component.
 * @param {string} props.label - Label for the select input.
 * @param {string} props.placeholder - Initial value for the select input.
 * @param {Object[]} props.options - Options for the select input.
 * @returns {JSX.Element} Select input component.
 * 
 * @example
 * <SelectInput
      label="Select Box"
      placeholder="Select Time"
      options={[{"week": "Week", "daily": "Daily"}]}
      onChange={changeHanlder}
      value={data[props.name]}
    />
 */
const SelectInput = (props) => {
  // console.log("select", { props });
  const grpStyle = props.grpStyle || "mb-3";
  return (
    <Form.Group className={grpStyle}>
      {props.label && <Form.Label className="mr-3">{props.label}</Form.Label>}
      <Form.Select aria-label="Select Option" aria-controls="option" {...props}>
        <option key="blankChoice" hidden value>
          {props.placeholder}
        </option>
        {props.options &&
          props.options.map((option) => {
            const [[k, v]] = Object.entries(option);
            return (
              <option key={k} value={k}>
                {v}
              </option>
            );
          })}
      </Form.Select>
    </Form.Group>
  );
};

/**
 * Custom form component that renders a form with input fields.
 * Handles form submission, displays success and error messages, and redirects after successful submission.
 * @param {Object} props - Props for the custom form component.
 * @param {string} props.title - Title of the form.
 * @param {Object} props.data - Data object that holds the form input values.
 * @param {Function} props.setData - Function to update the data object.
 * @param {Object[]} props.inputFieldProps - Array of input field props.
 * @param {Function} props.submitHandler - Form submission handler function.
 * @param {string} props.target - Target route to navigate after successful form submission.
 * @param {string} props.successMessage - Success message to display after successful form submission.
 * @param {Object} props.reducerProps - Props for the reducer (e.g., loading, success, error, dispatch).
 * @param {React.ReactNode} props.children - Child components to render within the form.
 * @returns {JSX.Element} Custom form component.
 * 
 * @example
 * const [info, setInfo] = useState({name: "", age: ""});
 * const dataAttr = [
 * {
      type: 'text',
      col: 8,
      props: {
        label: 'Name',
        name: 'name',
        value: info.name
      },
    },
    {
      type: 'number',
      col: 4,
      props: {
        label: 'Age',
        name: 'age',
        value: info.age
        min: 0
      },
    },
  ];

  <AddForm
    title="Add Order"
    data={info}
    setData={setInfo}
    inputFieldProps={orderAttr}
    submitHandler={submitHandler}
    target="/admin/users"
    successMessage="User Created Successfully!"
    reducerProps={{ loading: loadingAdd, error, success, dispatch }}
  >
    {children}
  </AddForm>
 */
const EditForm = (props) => {
  // console.log("edit", { props });
  const navigate = useNavigate();

  const {
    title,
    data,
    setData,
    inputFieldProps,
    submitHandler,
    target,
    successMessage,
    reducerProps,
    children,
  } = props;

  const { loadingUpdate, success, error } = reducerProps;

  useEffect(() => {
    if (success) {
      toast.success(successMessage, toastOptions);
      setTimeout(() => {
        if (target) navigate(target);
        else {
          props.onHide();
          // props.reload();
        }
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.error?.message, toastOptions);
      // clearErrors(dispatch);
    }
  }, [error]);
  // toast.warning("dfdf", toastOptions);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Container className="small-container">
            <Row>
              {inputFieldProps.map(({ type, col = 6, props }) => {
                // console.log("edit", { type, col, props, key: props.name });
                // console.log(data);
                switch (type) {
                  case "check":
                    return (
                      <Col key={props.name} md={col}>
                        <CheckInput
                          {...props}
                          onChange={(e) =>
                            setData({ ...data, [props.name]: e.target.checked })
                          }
                          checked={data[props.name]}
                        />
                      </Col>
                    );
                  case "select":
                    return (
                      <Col key={props.name} md={col}>
                        <SelectInput
                          {...props}
                          onChange={(e) =>
                            setData({ ...data, [props.name]: e.target.value })
                          }
                          value={data[props.name]}
                        />
                      </Col>
                    );
                  case "date":
                    return (
                      <Col key={props.name} md={col}>
                        <DateInput
                          {...props}
                          onChange={(e) =>
                            setData({ ...data, [props.name]: e.target.value })
                          }
                          value={data[props.name]}
                        />
                      </Col>
                    );
                  default:
                    return (
                      <Col key={props.name} md={col}>
                        <TextInput
                          {...props}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            })
                          }
                          value={data[props.name]}
                        />
                      </Col>
                    );
                }
              })}
            </Row>
            {children}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Close
          </Button>
          <SubmitButton
            variant="success"
            loading={loadingUpdate}
            disabled={loadingUpdate}
          >
            Submit
          </SubmitButton>
        </Modal.Footer>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

const AddForm = (props) => {
  console.log({ props });
  const navigate = useNavigate();

  const {
    title,
    data,
    setData,
    inputFieldProps,
    submitHandler,
    target,
    successMessage,
    reducerProps,
    children,
  } = props;

  const { loading, success, error } = reducerProps;

  useEffect(() => {
    if (success) {
      toast.success(successMessage, toastOptions);
      setTimeout(() => {
        navigate(target);
      }, 2000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      console.log({ error });
      toast.error(error?.data?.error?.message, toastOptions);
      // clearErrors(dispatch);
    }
  }, [error]);

  return (
    <MotionDiv>
      <Row
        className="mt-2 mb-3"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}
      >
        <Col>
          <span style={{ fontSize: "xx-large" }}>{title}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Header as={"h4"}>Add Details</Card.Header>
            <Form onSubmit={submitHandler}>
              <Card.Body>
                <Row>
                  {inputFieldProps.map(({ type, col = 6, props }) => {
                    // console.log({ type, col, props, key: props.name });
                    switch (type) {
                      case "check":
                        return (
                          <Col key={props.name} md={col}>
                            <CheckInput
                              {...props}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  [props.name]: e.target.checked,
                                })
                              }
                              value={data[props.name]}
                            />
                          </Col>
                        );
                      case "select":
                        return (
                          <Col key={props.name} md={col}>
                            <SelectInput
                              {...props}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  [props.name]: e.target.value,
                                })
                              }
                              value={data[props.name]}
                            />
                          </Col>
                        );
                      default:
                        return (
                          <Col key={props.name} md={col}>
                            <TextInput
                              {...props}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  [e.target.name]: e.target.value,
                                })
                              }
                              value={data[props.name]}
                            />
                          </Col>
                        );
                    }
                  })}
                </Row>
                {children}
              </Card.Body>
              <Card.Footer>
                <SubmitButton
                  variant="success"
                  loading={loading}
                  disabled={loading}
                >
                  Submit
                </SubmitButton>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </MotionDiv>
  );
};

const DeleteModal = (props) => {
  const { title, body, submitHandler, successMessage, reducerProps, target } =
    props;
  const { loading, success, error } = reducerProps;

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      toast.success(successMessage, toastOptions);
      setTimeout(() => {
        if (target) navigate(target);
        else {
          props.onHide();
          // props.reload();
        }
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.error?.message, toastOptions);
      // clearErrors(dispatch);
    }
  }, [error]);
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Container className="small-container">
            <p> {body}</p>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <SubmitButton variant="success" loading={loading} disabled={loading}>
            Yes
          </SubmitButton>
        </Modal.Footer>
      </Form>
      <ToastContainer />
    </Modal>
  );
};

export {
  AddForm,
  EditForm,
  TextInput,
  CheckInput,
  RadioInput,
  SelectInput,
  DeleteModal,
};
