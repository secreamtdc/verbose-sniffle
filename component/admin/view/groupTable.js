
import React from "react";
import { Row, Col, ListGroup, Card, Badge } from "react-bootstrap";
import AdminTable from "../table";
import DropGroup from "../DropGroup";


export default props => {
    const {
        groups,
        _changeRole,
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
  
              let countUsers = _.filter(accounts, ["group_id", element._id])
                .length;
              let eleGroup = (
                <div>
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
              <b style={{fontSize:'16px'}}>
                {group_select.name} : {countUsersGroupSelect} users
              </b>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <AdminTable
                  _changeRole={_changeRole}
                  searchInput={searchInput}
                  accounts={accounts}
                  roles={roles}
                  groupSelect={groupSelect != null ? groupSelect : groups[0]}
                  is_groupview = {true}
                />                
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
}
