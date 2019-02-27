import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Container, Badge, Row, Col, Button } from "react-bootstrap";
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

import NavbarMenu from "../component/navbar";
import AdminTable from "../component/admin/table";
import GroupTable from "../component/admin/groupTable";

class Page extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }
  constructor(props) {
    super(props);
    this.state = {
      account_id: 10, //รอเปลี่ยนตาม account
      accounts: [],  //list user ที่ใช้แสดง เปลี่ยนแปลงจาก filter
      accounts_const: [], //ดึง list ของ user มา
      roles: [],
      groups: [],
      loading: true,
      //ของอีกหน้า
      groupSelect: null, // กลุ่มที่เลือก
      viewDetail: true, //เปลี่ยนหน้า
    };

    this._handleChangeRole = this._handleChangeRole.bind(this);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentDidMount() {
    console.log("componentDidMount");

    const { account_id } = this.state

    this.getRole(account_id);
    this.getUser(account_id);
    this.getGroup(account_id);
  }
  getUser = (account_id) => {
    axios.get("/api/admin/accounts/" + account_id + "/users")
      .then(res => {
        this.setState({ accounts: res.data, accounts_const: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getGroup = (account_id) => {
    axios.get("/api/admin/accounts/" + account_id + "/groups")
      .then(res => {
        this.setState({ groups: res.data, loading: false });

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getRole = (account_id) => {
    axios.get("/api/admin/accounts/" + account_id + "/roles")
      .then(res => {
        this.setState({ roles: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async _handleChangeRole(user_id, e) {

    let role_new_id = e.target.value
    axios.get("/api/admin/accounts/changerole/" + user_id + "/" + role_new_id)
      .then(res => {
        this.getUser(this.state.account_id);
        alert('Update Role')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  _handleKeyUP = (e) => {
    const { accounts_const } = this.state
    let accounts = accounts_const;
    let searchAccounts = _.filter(accounts, function (o) {

      o.group_name = o.group_docs[0].name;
      o.role_name = o.role_docs[0].name;

      let data = _.pick(o, ['_id', 'name', 'email', 'group_name', 'role_name'])
      let text = _.toUpper(Object.values(data).join("|"));
      let search = _.toUpper(e.target.value);
      let res = text.match(search);
      if (res != null) {
        return true;
      } else {
        return false;
      }
    })
    this.setState({ "accounts": searchAccounts })
  }
  selectGroup = (group_id) => {
    const { groups } = this.state
    let groupSelect = _.find(groups, ['_id', group_id])
    this.setState({ "groupSelect": groupSelect })
  }

  //เปลี่ยนหน้า
  viewDetailOpen = () => {
    const { viewDetail } = this.state
    if (viewDetail) {
      this.setState({
        viewDetail: false
      });
    }
    else {
      this.setState({
        viewDetail: true
      });
    }
  }
  render() {
    const { loading, account_id, groups, accounts, roles, groupSelect } = this.state

    var viewDetailRender;
    if (this.state.viewDetail) {
      viewDetailRender = <AdminTable _handleChangeRole={this._handleChangeRole} _handleKeyUP={this._handleKeyUP} accounts={accounts} roles={roles} />;
    } else {
      viewDetailRender = <GroupTable groups={groups} _handleChangeRole={this._handleChangeRole} _handleKeyUP={this._handleKeyUP} accounts={accounts} roles={roles} groupSelect={groupSelect} selectGroup={this.selectGroup} />;
    }

    return (
      <div>
        <NavbarMenu />
        <Container>

          <Row>
            <Col>
              <h1 style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                Accounts <Badge variant="secondary">{account_id}</Badge>
              </h1>
            </Col>
            <Col>
              <Button variant="warning" style={{ marginTop: "30px", marginBottom: "20px", float: 'right' }} onClick={this.viewDetailOpen} disabled={this.state.loading}>View</Button>
            </Col>
          </Row>

          {loading ? <div className='loading-spinner'></div> : viewDetailRender}
        </Container>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Page);
