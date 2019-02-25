import React from "react";
import { Modal,ButtonToolbar,Button } from 'react-bootstrap';



class MyVerticallyCenteredModal extends React.Component {
    render() {
      return (
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>เปลี่ยนรหัส</h4>
            <p>
                USER_ID : {this.props.row._id}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} style={{backgroundColor:'#37BBA5'}}>Close</Button>
          </Modal.Footer>
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
            style={{backgroundColor:'#0E5383'}} size="sm"
            onClick={() => this.setState({ modalShow: true })}
            block
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