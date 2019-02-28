import React from "react";
import { Row, Col, ListGroup, Card, Button, Badge } from "react-bootstrap";

import GroupTableUsers from "./groupTable_users";
import DropGroup from "./DropGroup";

export default props => {
  const { groups, _changeRole, _changeGroup, _handleKeyUP, accounts, roles, groupSelect, selectGroup, handleDrop } = props;
  
  //นับจำนวนคนในแต่ละกลุ่ม
  const group_select = groupSelect != null ? groupSelect :groups[0]
  const countUsersGroupSelect = _.filter(accounts, ['group_id', group_select._id]).length
  
  return (
    <div>

      <Row>
        <Col md="3">
          <ListGroup defaultActiveKey={"#" + groups[0]._id}>
            {groups.map((element, i) => {
              
              console.log("Entered");

              let countUsers = _.filter(accounts, ['group_id', element._id]).length
              let eleGroup =  <div> {element.name} <Badge pill variant="secondary">{countUsers}</Badge></div>
              // Return the element. Also pass key
              return (
                <ListGroup.Item
                  className="Btn-Blue-BG"
                  style={{ marginBottom: "5px", borderRadius: "4px" }}
                  action
                  href={"#" + element._id}
                  onClick={()=>{selectGroup(element._id)}}
                >
                
                <DropGroup item={eleGroup} box={element._id} id={element._id} handleDrop={(txt,type) => handleDrop(txt,type)}/>
                </ListGroup.Item>
                
              );
            })}
          </ListGroup>
        </Col>
        <Col>
          <Card border="" style={{ width: "100%" }}>
            
            <Card.Header><b>{group_select.name} : {countUsersGroupSelect} users</b> </Card.Header>
            <Card.Body>
              {/* <Card.Title>Success Card Title</Card.Title> */}
              <Card.Text>
              <GroupTableUsers _changeRole={_changeRole}  _handleKeyUP={_handleKeyUP} accounts={accounts} roles = {roles} groupSelect = {groupSelect != null ? groupSelect :groups[0]}  />
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
