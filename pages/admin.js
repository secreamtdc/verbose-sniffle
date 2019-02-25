import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Container, Badge, Row, Col, Button } from "react-bootstrap";

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
      account_id:10,
      accounts: [],
      accounts_temp: [],
      roles:[],
      groups:[],
      groupSelect:null,
      viewDetail: true,
      loading:true
    };

    this._handleChangeRole = this._handleChangeRole.bind(this);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");

  }
  async componentDidMount() {
    const account_id = this.state.account_id;
    console.log("componentDidMount");
    
   await this.getRole(account_id);
    this.getUser(account_id);
    this.getGroup(account_id);


  }
  getUser = (account_id) =>{
    axios.get("/api/admin/accounts/"+account_id+"/users")
    .then(res => {
      this.setState({ accounts: res.data,accounts_temp:res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getGroup = (account_id) =>{
    axios.get("/api/admin/accounts/"+account_id+"/groups")
    .then(res => {
      this.setState({ groups: res.data,loading:false });
      
      console.log(this.state.groups);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getRole = (account_id) =>{
    axios.get("/api/admin/accounts/"+account_id+"/roles")
    .then(res => {
      this.setState({ roles: res.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async _handleChangeRole(user_id, e) {
    // let accounts = this.state.accounts;

    let role_new_id = e.target.value
    axios.get("/api/admin/accounts/changerole/"+user_id+"/"+role_new_id)
    .then(res => {
      
       this.getUser(this.state.account_id);
       alert('Update Role')
    })
    .catch(function (error) {
      console.log(error);
    });

   

  }
  _handleKeyUP = (e) => {
    let accounts = this.state.accounts_temp;
    let searchAccounts =     _.filter(accounts, function(o) { 
      //set field group_name role_docs
      o.group_name = o.group_docs[0].name;
      o.role_name = o.role_docs[0].name;
      
      let data = _.pick(o, ['_id', 'name', 'email','group_name','role_name'])

              let text = _.toUpper(Object.values(data).join("|"));

              let search = _.toUpper(e.target.value); 
              let res = text.match(search);
              if(res != null){
                return true;
              }else{
                return false;
              }
    })

    this.setState({"accounts":searchAccounts})
  }
  selectGroup = (group_id) => {
   let groupSelect = _.find(this.state.groups, ['_id', group_id])
    
    
    this.setState({"groupSelect":groupSelect})
  }


  viewDetailOpen = () => {
    if (this.state.viewDetail) {
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
    
    var viewDetail;
    if (this.state.viewDetail) {
      viewDetail = <AdminTable _handleChangeRole={this._handleChangeRole} _handleKeyUP={this._handleKeyUP} accounts={this.state.accounts} roles = {this.state.roles}   />;
    } else {
      viewDetail = <GroupTable groups={this.state.groups}  _handleChangeRole={this._handleChangeRole} _handleKeyUP={this._handleKeyUP} accounts={this.state.accounts} roles = {this.state.roles}  groupSelect = {this.state.groupSelect} selectGroup = {this.selectGroup} />;
    }

    return (
      <div>
        <NavbarMenu />
        <Container>
        
          <Row>
            <Col>
              <h1 style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                Accounts <Badge variant="secondary">{this.state.account_id}</Badge>
              </h1>
            </Col>
            <Col>
              <Button variant="warning" style={{ marginTop: "30px", marginBottom: "20px", float: 'right' }} onClick={this.viewDetailOpen} disabled = {this.state.loading}>View</Button>
            </Col>
          </Row>

          {this.state.loading ? <div className='loading-spinner'></div> : viewDetail}
        </Container>
      </div>
    );
  }
}

export default Page;
