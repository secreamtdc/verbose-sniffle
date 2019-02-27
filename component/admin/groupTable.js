import React from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import GroupTableUsers from "./groupTable_users";

export default props => {
  const { groups, _handleChangeRole, _handleKeyUP, accounts, roles, groupSelect, selectGroup } = props;

  return (
    <div>

      <Row>
        <Col md="3">
          <ListGroup defaultActiveKey={"#" + groups[0]._id}>
            {groups.map((element, i) => {
              console.log("Entered");
              // Return the element. Also pass key
              return (
                <ListGroup.Item
                  className="Btn-Blue-BG"
                  style={{ marginBottom: "5px", borderRadius: "4px" }}
                  action
                  href={"#" + element._id}
                  onClick={()=>{selectGroup(element._id)}}
                >
                  {element.name}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <Card border="" style={{ width: "100%" }}>

            <Card.Header><b>{groupSelect != null ? groupSelect.name :groups[0].name}</b></Card.Header>
            <Card.Body>
              {/* <Card.Title>Success Card Title</Card.Title> */}
              <Card.Text>
              <GroupTableUsers _handleChangeRole={_handleChangeRole} _handleKeyUP={_handleKeyUP} accounts={accounts} roles = {roles} groupSelect = {groupSelect != null ? groupSelect :groups[0]}  />
              <br/>
              <button className="btn" style={{
                backgroundColor: '#37BBA5',
                height: '35px',
                fontSize: '14px',
                fontWeight: '700',
                color:'white',
                float:'right'
              }}>+ Add New User</button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
