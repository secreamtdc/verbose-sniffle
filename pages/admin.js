import React from "react";
import axios from "axios";
import { filter, pick, toUpper, find } from "lodash";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { toastr } from 'react-redux-toastr'

import AdminTable from "../component/admin/table";
import GroupTable from "../component/admin/view/groupTable";
import View from "../component/admin/view/admin";

const API_ADMIN_ACCOUNT = "/api/admin/accounts"

const getUser = ({ account_id }) => axios.get(
  `${API_ADMIN_ACCOUNT}/${account_id}/users`
)
const getGroup = ({ account_id }) => axios.get(
  `${API_ADMIN_ACCOUNT}/${account_id}/groups`
)

const getRole = ({ account_id }) => axios.get(
  `${API_ADMIN_ACCOUNT}/${account_id}/roles`
);

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      account_id: 10, //รอเปลี่ยนตาม account
      accounts: [], //list user ที่ใช้แสดง เปลี่ยนแปลงจาก filter
      accounts_const: [], //ดึง list ของ user มา
      roles: [],
      groups: [],
      loading: true,
      groupSelect: null, // กลุ่มที่เลือก
      viewDetail: true, //เปลี่ยนหน้า
    };

    this.changeRole = this.changeRole.bind(this);
    this.changeGroup = this.changeGroup.bind(this);
  }

  componentDidMount() {
    const { account_id } = this.state;
    this.getRole(account_id);
    this.getGroup(account_id);
    this.getUser(account_id);
  }

  getUser = async (account_id) => {
    try {
      const resp = await getUser({ account_id });
      this.setState({
        accounts: resp.data,
        accounts_const: resp.data
      });
    } catch (error) {
      console.log(error);
      toastr.error('ERROR', 'Something went wrong.')
    }
  };

  getGroup = async account_id => {
    try {
      const resp = await getGroup({ account_id });
      this.setState({
        groups: resp.data,
        loading: false,
        groupSelect: resp.data[0]
      });
    } catch (error) {
      console.log(error);
      toastr.error('ERROR', 'Something went wrong.')
    }
  };

  getRole = async account_id => {
    try {
      const resp = await getRole({ account_id })
      this.setState({ roles: resp.data });
    } catch (error) {
      console.log(error);
      toastr.error('ERROR', 'Something went wrong.')
    }
  };

  changeRole = async (user_id, e) => {
    const { account_id } = this.state;
    let role_new_id = e.target.value;
    try {
      const resp = await axios.get(
        `${API_ADMIN_ACCOUNT}/changerole/${user_id}/${role_new_id}`
      );

      if (resp.data.ok == 1) {
        this.getUser(account_id);
        toastr.success('Success', 'Update user role!')
      }
    } catch (error) {
      console.log(error);
      toastr.error('ERROR', 'Something went wrong.')
    }
  }

  changeGroup = async (user, group_id) => {
    const { account_id } = this.state;
    try {
      const resp = await axios.get(
        `${API_ADMIN_ACCOUNT}/changegroup/${user.id}/${group_id}`
      );
      if (resp.data.ok == 1) {
        this.getUser(account_id);
        toastr.success('Success', 'Update user group!')
      }
    } catch (error) {
      console.log(error);
      toastr.error('ERROR', 'Something went wrong.')
    }
  };

  searchInput = e => {

    const { accounts_const } = this.state;
    let accounts = accounts_const;
    let searchAccounts = filter(accounts, function (o) {
      o.group_name = o.group_docs[0].name;
      o.role_name = o.role_docs[0].name;

      let data = pick(o, ["name", "email", "group_name", "role_name"]);
      let text = toUpper(Object.values(data).join("|"));
      let search = toUpper(e.target.value);

      let res = text.includes(search)

      if (res) {
        return true;
      } else {
        return false;
      }
    })
    this.setState({ accounts: searchAccounts });
  }
  resetSearch = () => {
    const { accounts_const } = this.state;
    let accounts = accounts_const;
    this.setState({ accounts: accounts });
  };
  selectGroup = group_id => {
    const { groups } = this.state;
    let groupSelect = find(groups, ["_id", group_id]);
    this.setState({ groupSelect: groupSelect });
  };

  viewDetailOpen = () => {
    const { viewDetail } = this.state;
    this.resetSearch();
    if (viewDetail) {
      this.setState({
        viewDetail: false
      });
    } else {
      this.setState({
        viewDetail: true
      });
    }
  };

  render() {
    const {
      loading,
      account_id,
      groups,
      accounts,
      roles,
      groupSelect,
      viewDetail

    } = this.state;

    var viewDetailRender;
    if (viewDetail) {
      viewDetailRender = (
        <AdminTable
          changeRole={this.changeRole}
          searchInput={this.searchInput}
          accounts={accounts}
          roles={roles}
        />
      );
    } else {
      viewDetailRender = (
        <GroupTable
          groups={groups}
          changeRole={this.changeRole}
          searchInput={this.searchInput}
          accounts={accounts}
          roles={roles}
          groupSelect={groupSelect}
          selectGroup={this.selectGroup}
          handleDrop={this.changeGroup}
        />
      );
    }

    return (
      <div>
        <View
          account_id={account_id}
          viewDetail={viewDetail}
          viewDetailOpen={this.viewDetailOpen}
          loading={loading}
        >
          {viewDetailRender}
        </View>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Page);
