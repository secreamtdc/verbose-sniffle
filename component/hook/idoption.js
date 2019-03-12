import React from "react";
import { Dropdown, ListGroup } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CustomToggle = (props) => {

  const handleClick = (e) => {
    e.preventDefault();

    props.onClick(e);
  }
    return (
      <a href="" onClick={handleClick}>
        {props.children}
      </a>
    );
}


export default props => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        {!props.row.is_removed ? (
          <i
            title={props.row._id}
            class="fas fa-id-card-alt"
            style={{ fontSize: "18px", cursor: "pointer", color: "#080808" }}
          />
        ) : (
          <i
            title={props.row._id}
            class="fas fa-user-slash"
            style={{ fontSize: "18px", cursor: "pointer", color: "#ff8f8f" }}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <CopyToClipboard text={props.row._id}>
          <Dropdown.Item>
            <h3>
              <i class="fas fa-font" /> Copy String
            </h3>
          </Dropdown.Item>
        </CopyToClipboard>
        <CopyToClipboard text={`ObjectId("${props.row._id}")`}>
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
