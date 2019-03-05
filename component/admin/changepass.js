import React from "react";
import { Modal, ButtonToolbar, Button, Form, Row, Col } from 'react-bootstrap';

class MyVerticallyCenteredModal extends React.Component {
  // constructor(...args) {
  //   super(...args);

  constructor(props) {
    super(props)
  
    this.state = { validated: false, password: "", repassword: "" };
  }

  handleSubmit(event) {
    const { password, repassword } = this.state;
    const form = event.currentTarget;
    if (form.checkValidity() === false || (password != repassword)) {
      event.preventDefault();
      event.stopPropagation();
      if ((password != repassword) && (password != "") && (repassword != "")) {
        alert("Comfirm password doesn't match.")
      }
    }
    this.setState({
      validated: true
    });
  }
  render() {
    const { validated } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style = {{opacity:1}}
        centered
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={e => this.handleSubmit(e)}
          action = '#'
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
                <Form.Control plaintext readOnly defaultValue={this.props.row.email} />
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Password" required
                  onChange={(password) => this.setState({ "password": password.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a password.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Re-Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="Comfirm Password" required
                  onChange={(password) => this.setState({ "repassword": password.target.value })}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a comfirm password.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button disabled={this.props.row.is_removed}
          style={{ fontSize:"12px" ,fontWeight:"300",padding:"1px 5px"}}
          variant="info"
          size="sm"
          onClick={() => this.setState({ modalShow: true })}
        >
          Change Password
          </Button>

        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={modalClose}
          row={this.props.row}
        />
      </ButtonToolbar>
    );
  }
}

export default App;