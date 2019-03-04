import React from "react";
import { Badge, Row, Col, Button } from "react-bootstrap";

import NavbarMenu from "../../navbar";

export default props => {
  const {
    account_id,
    viewDetailOpen,
    loading,
    children
  } = props

  return (
    <div>
      <NavbarMenu />
      <div style={{ marginLeft: "12%", marginRight: "12%" }}>
        <Row>
          <Col>
            <h1
              style={{
                paddingTop: "20px",
                paddingBottom: "20px"
              }}
            >
              Accounts <Badge variant="secondary">{account_id}</Badge>
            </h1>
          </Col>
          <Col>
            <Button
              variant="warning"
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                float: 'right'
              }}
              onClick={viewDetailOpen}
              disabled={loading}
            >
              View
            </Button>
          </Col>
        </Row>

        {children}
      </div>
      {
        loading &&
        (
          <div id="overlay">
            <div className='loading-spinner' />
          </div>
        )
      }

    </div>)
}