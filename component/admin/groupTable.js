import React from "react";
import GroupTableView from "./view/groupTable.js";

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
    handleDrop
  } = props;
  
  const group_select = groupSelect != null ? groupSelect : groups[0];
  const countUsersGroupSelect = _.filter(accounts, ["group_id",
    group_select._id
  ]).length;

  return (
    <GroupTableView 
      groups={groups} 
      _changeRole={_changeRole} 
      _changeGroup={_changeGroup} 
      searchInput={searchInput} 
      accounts={accounts} 
      roles={roles} 
      groupSelect={groupSelect} 
      selectGroup={selectGroup} 
      handleDrop={handleDrop}
      group_select={group_select}
      countUsersGroupSelect={countUsersGroupSelect}
      
      />
  );
};
