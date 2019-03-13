import React, { useState, useEffect } from "react";

import axios from "axios";
import { filter, pick, toUpper, find } from "lodash";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { toastr } from "react-redux-toastr";

import AdminTable from "../component/hook/table";
import GroupTable from "../component/hook/view/groupTable";
import View from "../component/hook/view/admin";
const API_ADMIN_ACCOUNT = "/api/admin/accounts";

const callAPI = ({ account_id, collection }) =>
  axios.get(`${API_ADMIN_ACCOUNT}/${account_id}/${collection}`);

const updateAPI = ({ action, user_id, action_id }) =>
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
  let timeout;

  const createCallAPI = async (account_id, collection, callback) => {
    setLoading(true)
    try {
      const resp = await callAPI({ account_id, collection });
      callback(resp.data);
    } catch (error) {
      console.log(error);
      toastr.error("ERROR", "Something went wrong.");
    } finally {
      setLoading(false)
    }
  }

  const createUpdateAPI = async (action, user_id, action_id, callback) => {
    setLoading(true)
    try {
      const resp = await updateAPI({ action, user_id, action_id });

      callback(resp.data);
    } catch (error) {
      console.log(error);
      toastr.error("ERROR", "Something went wrong.");
    } finally {
      setLoading(false)
    }
  };

  const fetchData = async () => {
    if (!roles.length) {
      await createCallAPI(account_id, "roles", data => {
        setRoles(data);
      }); //getRole API
    }

    await createCallAPI(account_id, "users", data => {
      setAccounts(data);
      setAccounts_const(data);
      setLoading(false);
      console.log('test ###2')
    }); //getUser API
  }

  useEffect(() => {
    createCallAPI(account_id, "groups", data => {
      setGroups(data);
      setGroupSelect(data[0]);
    }); //getGroup API
  }, [])

  useEffect(() => {
    fetchData()
  }, [viewDetail])

  const changeGroup = async (user, group_id) => {
    setLoading(true);

    createUpdateAPI("changegroup", user.id, group_id, data => {
      if (data.ok === 1) {
        //Call new users
        createCallAPI(account_id, "users", data => {
          setAccounts(data);
          setAccounts_const(data);

          setLoading(false);
          toastr.success("Success", "Update user role!");
        });
      }
    });
  };

  const changeRole = async (user_id, e) => {
    let role_new_id = e.target.value;
    setLoading(true);
    createUpdateAPI("changerole", user_id, role_new_id, data => {
      if (data.ok === 1) {
        //Call new users
        createCallAPI(account_id, "users", data => {
          setAccounts(data);
          setAccounts_const(data);

          setLoading(false);
          toastr.success("Success", "Update user role!");
        });
      }
    });
  };

  const searchInput = e => {
    let accounts = accounts_const;
    let searchAccounts = filter(accounts, function (o) {
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

  const searchInput_backend = e => {
    let search = toUpper(e.target.value);
    const searchData = search => {
      if (
        search.length > 0 &&
        search != null &&
        search != undefined &&
        search != "" &&
        search != " "
      ) {
        createCallAPI(account_id, "search/" + search, data => {
          setAccounts(data);
        }); //getUserSearch API
      } else {
        setAccounts(accounts_const);
      }
    };
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(function () {
      searchData(search);
    }, 500);
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
        searchInput={searchInput_backend}
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

export default DragDropContext(HTML5Backend)(Page);
