import React, { useState, useEffect } from "react";
import axios from "axios";
import { filter, pick, toUpper, find } from "lodash";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { toastr } from 'react-redux-toastr'

import AdminTable from "../component/hook/table";
import GroupTable from "../component/hook/view/groupTable";
import View from "../component/hook/view/admin";
const API_ADMIN_ACCOUNT = "/api/admin/accounts";

const CallAPI = ({ account_id, conllection }) =>
  axios.get(`${API_ADMIN_ACCOUNT}/${account_id}/${conllection}`);
const UpdateAPI = ({ action, user_id, action_id }) =>
  axios.get(`${API_ADMIN_ACCOUNT}/${action}/${user_id}/${action_id}`);

const Page = props => {
  const [account_id, setAccount_id] = useState(10);
  const [accounts, setAccounts] = useState([]);
  const [accounts_const, setAccounts_const] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [groupSelect, setGroupSelect] = useState({});
  const [viewDetail, setViewDetail] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    CreateCallAPI(account_id, "roles", data =>{
      setRoles(data);

      CreateCallAPI(account_id, "users", data => { 
        setAccounts(data)
        setAccounts_const(data)
        setLoading(false);
      }); //getUser API

    }); //getRole API
    CreateCallAPI(account_id, "groups", data => {
      setGroups(data);
      setGroupSelect(data[0])
    }); //getGroup API



    console.log("useEffect");
  }, [viewDetail]);

  const changeGroup = async (user, group_id) => {
    setLoading(true)

    CreateUpdateAPI("changegroup", user.id, group_id, data => {
      if (data.ok == 1) {
        //Call new users
        CreateCallAPI(account_id, "users", data => { 
          setAccounts(data)
          setAccounts_const(data)

          setLoading(false);
          toastr.success("Success", "Update user role!");
        }); 
      }
    });
  };
  const changeRole = async (user_id, e) => {
    let role_new_id = e.target.value;
    setLoading(true)
    CreateUpdateAPI("changerole", user_id, role_new_id, data => {
      if (data.ok == 1) {
        //Call new users
        CreateCallAPI(account_id, "users", data => { 
          setAccounts(data)
          setAccounts_const(data)

          setLoading(false);
          toastr.success("Success", "Update user role!");
        }); 
      }
    });
  };

  const searchInput = e => {
    let accounts = accounts_const;
    let searchAccounts = filter(accounts, function(o) {
      o.group_name = o.group_docs[0].name;
      o.role_name = o.role_docs[0].name;

      let data = pick(o, ["name", "email", "group_name", "role_name"]);
      let text = toUpper(Object.values(data).join("|"));
      let search = toUpper(e.target.value);

      let res = text.includes(search);

      if (res) {
        return true;
      } else {
        return false;
      }
    });
    setAccounts(searchAccounts);
  };
  const searchInput2 = e => {

    let search = toUpper(e.target.value);
    if(search != null && search != undefined && search != ""){
      CreateCallAPI(account_id, "search/"+search, data => {
        setAccounts(data);
      }); //getUserSearch API
    }else{
      setAccounts(accounts_const);
    }
  };
  
  const resetSearch = () => {
    let accounts = accounts_const;
    setAccounts(accounts);
  };
  const selectGroup = group_id => {
    let groupSelect = find(groups, ["_id", group_id]);
    setGroupSelect(groupSelect);
  };

  const viewDetailOpen = () => {
    resetSearch();
    if (viewDetail) {
      setViewDetail(false);
    } else {
      setViewDetail(true);
    }
  };

  var viewDetailRender;
  if (viewDetail) {
    viewDetailRender = (
      <AdminTable
        changeRole={changeRole}
        searchInput={searchInput2}
        accounts={accounts}
        roles={roles}
      />
    );
  } else {
    viewDetailRender = (
      <GroupTable
        groups={groups}
        changeRole={changeRole}
        searchInput={searchInput}
        accounts={accounts}
        roles={roles}
        groupSelect={groupSelect}
        selectGroup={selectGroup}
        handleDrop={changeGroup}
      />
    );
  }

  return (
    <div>
      <View
        account_id={account_id}
        viewDetail={viewDetail}
        viewDetailOpen={viewDetailOpen}
        loading={loading}
      >
        {viewDetailRender}
      </View>
    </div>
  );
};

const CreateCallAPI = async (account_id, conllection, callback) => {
  try {
    const resp = await CallAPI({ account_id, conllection });
    callback(resp.data);
  } catch (error) {
    console.log(error);
    toastr.error("ERROR", "Something went wrong.");
  }
};
const CreateUpdateAPI = async (action, user_id, action_id, callback) => {
  try {
    console.log(action, user_id, action_id);
    const resp = await UpdateAPI({ action, user_id, action_id });
  
    
    callback(resp.data);
  } catch (error) {
    console.log(error);
    toastr.error("ERROR", "Something went wrong.");
  }
};

export default DragDropContext(HTML5Backend)(Page);