import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import _ from "lodash";

import ChangePass from "./changepass"
import DragGroup from "./DragGroup"


export default props => {

const { _changeRole, _handleKeyUP, accounts, roles, groupSelect } = props;
const groups = _.filter(accounts, ['group_id', groupSelect._id])

console.log(groups)

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn" style={{ backgroundColor: '#37BBA5' }} onClick={handleClick} style={{ marginBottom: '10px', backgroundColor: '#37BBA5', color: 'white' }}>Export to CSV</button>
      </div>
    );
  };


  const columns = [{
    dataField: '_id',
    text: '#',
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    },
    formatter: _DragGroup
  }, {
    dataField: 'name',
    text: 'Username',
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    }
  }, {
    dataField: 'email',
    text: 'E-mail',
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    }
  }, {
    dataField: 'group_docs[0].name',
    text: 'group',
    sort: true,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    }
  }, {
    dataField: 'role_id',
    text: 'Role',
    sort: true,
    csvExport: false,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    },
    formatter: changeRoleFormatter
  }, {
    dataField: '_id',
    text: 'Remote Login',
    formatter: remoteFormatter,
    csvExport: false,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    }
  }, {
    dataField: '_id',
    text: 'Change Password',
    formatter: changePasswordFormatter,
    csvExport: false,
    headerStyle: (column, colIndex) => {
      return {
        fontWeight: 'bold', cursor: 'pointer'
      };
    }
  },{
    dataField: 'role_docs[0].name',
    text: 'Role',
    hidden: true

  }];

  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (row.is_removed) {
      style.backgroundColor = '#e9e9e9';
      style.cursor = 'not-allowed';
      style.userSelect = 'none'
      style.opacity = '0.7';
    }

    return style;
  };

  function _DragGroup(cell, row) {
  
    return(<div><DragGroup txt={cell} id={cell} key={cell} /></div>);
    
  }
  function changePasswordFormatter(cell, row) {

    return (
      <ChangePass row={row} />
    );

  }
  function remoteFormatter(cell, row) {
    return (
      <Button disabled={row.is_removed} style={{ backgroundColor: '#0E5383' }} size="sm" block>Remote Login</Button>
    );
  }
  function changeRoleFormatter(cell, row) {

    let option = [];
    roles.forEach(element => {
      option.push(<option value={element._id}>{element.name}</option>)
    });
    let dropdown = (<Form.Control disabled={row.is_removed}
      defaultValue={row.role_id}
      as="select"
      onChange={(e) => { _changeRole(row._id, e); }}
    >
      {option}
    </Form.Control>);
    
    return (
      dropdown
    );
  }


  return (
    <div>
      <ToolkitProvider
        keyField="id"
        data={groups}
        columns={columns}

        // search
        exportCSV
      >
        {
          props => (
            <div>
                
              {/* <MyExportCSV {...props.csvProps} />
              <input type="text" className="form-control " placeholder="Search" onKeyUp={(e) => { _handleKeyUP(e); }} />
              <hr /> */}
              <BootstrapTable rowStyle={rowStyle}
                {...props.baseProps}
              />
            </div>
          )
        }
      </ToolkitProvider>
    </div>
  );
};
