import React, { Component } from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

class CustomToggle extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <a href="" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
}
export default props => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        <i
          title={props._id}
          class="fas fa-id-card-alt"
          style={{ fontSize: "18px", cursor: "pointer", color: "#080808" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <CopyToClipboard text={props._id}>
          <Dropdown.Item>
            <h3>
              {" "}
              <i class="fas fa-font" /> Copy String
            </h3>
          </Dropdown.Item>
        </CopyToClipboard>
        <CopyToClipboard text={`ObjectId("${props._id}")`}>
          <Dropdown.Item>
            <h3>
              <i class="fas fa-copy" /> Copy ObjectID
            </h3>
          </Dropdown.Item>
        </CopyToClipboard>
      </Dropdown.Menu>
    </Dropdown>
  );
};
