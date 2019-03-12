import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const MyVerticallyCenteredModal = props => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState(false);
  const [repassword, setRepassword] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || password != repassword) {
      event.preventDefault();
      event.stopPropagation();
      if (password != repassword && password != "" && repassword != "") {
        alert("Comfirm password doesn't match.");
      }
    }
    setValidated(true)
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{ opacity: 1 }}
      centered
    >
      <Form
        noValidate
        validated={validated}
        onSubmit={e => handleSubmit(e)}
        action="#"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control
                plaintext
                readOnly
                defaultValue={props.row.email}
              />
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Password"
                required
                onChange={password =>
                  setPassword(password.target.value)  
                }
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <br />
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
              Re-Password
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="password"
                placeholder="Comfirm Password"
                required
                onChange={password =>
                  setRepassword(password.target.value)
                }            
              />
              <Form.Control.Feedback type="invalid">
                Please provide a comfirm password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Submit</Button>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};


export default MyVerticallyCenteredModal;
