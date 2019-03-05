import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import ChangePasswordModal from './ChagePasswordModal'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalShow: false };
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

    return (
      <ButtonToolbar>
        <Button
          disabled={this.props.row.is_removed}
          style={{ fontSize: "12px", fontWeight: "300", padding: "1px 5px" }}
          variant="info"
          size="sm"
          onClick={() => this.setState({ modalShow: true })}
        >
          Change Password
        </Button>

        <ChangePasswordModal
          show={this.state.modalShow}
          onHide={modalClose}
          row={this.props.row}
        />
      </ButtonToolbar>
    );
  }
}

export default App;
