
import React from "react";
import { Row, Col, ListGroup, Card, Badge } from "react-bootstrap";
import { toastr } from "react-redux-toastr";
import GroupTableUsers from "../groupTableUsers";
import DropGroup from "../DropGroup";


export default props => {
    const {
        groups,
        _changeRole,
        _changeGroup,
        searchInput,
        accounts,
        roles,
        groupSelect,
        selectGroup,
        handleDrop,
        countUsersGroupSelect,
        group_select
      } = props;
    return (
        <Row>
        <Col md="3">
          <ListGroup defaultActiveKey={"#" + groups[0]._id}>
            {groups.map((element, i) => {
              console.log("Entered");
  
              let countUsers = _.filter(accounts, ["group_id", element._id])
                .length;
              let eleGroup = (
                <div>
                  {" "}
                  {element.name}{" "}
                  <Badge pill variant="secondary">
                    {countUsers}
                  </Badge>
                </div>
              );
              // Return the element. Also pass key
              return (
                <ListGroup.Item
                  className="Btn-Blue-BG"
                  style={{ marginBottom: "5px", borderRadius: "4px" }}
                  action
                  href={"#" + element._id}
                  onClick={() => {
                    selectGroup(element._id);
                  }}
                >
                  <DropGroup
                    item={eleGroup}
                    box={element._id}
                    id={element._id}
                    handleDrop={(txt, type) => handleDrop(txt, type)}
                  />
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <Card border="" style={{ width: "100%" }}>
            <Card.Header>
              <b>
                {group_select.name} : {countUsersGroupSelect} users
              </b>{" "}
            </Card.Header>
            <Card.Body>
              {/* <Card.Title>Success Card Title</Card.Title> */}
              <Card.Text>
                <GroupTableUsers
                  _changeRole={_changeRole}
                  searchInput={searchInput}
                  accounts={accounts}
                  roles={roles}
                  groupSelect={groupSelect != null ? groupSelect : groups[0]}
                />
                <br />
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#37BBA5",
                    height: "35px",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "white",
                    float: "right"
                  }}
                  onClick={() => toastr.error("ERROR", "Something went wrong.")}
                >
                  + Add New User
                </button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
}
