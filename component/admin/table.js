import React from "react";
import { Button, Form } from 'react-bootstrap';
import ChangePass from "./changepass"
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default props => {

  const { _changeRole, _handleKeyUP, accounts, roles } = props;

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
    }
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
    return (
      <Form.Control disabled={row.is_removed}
        defaultValue={row.role_id}
        as="select"
        onChange={(e) => { _changeRole(row._id, e); }}
      >
        {option}
      </Form.Control>
    );
  }


  return (
    <div>
      <ToolkitProvider
        keyField="id"
        data={accounts}
        columns={columns}

        // search
        exportCSV
      >
        {
          props => (
            <div>
              <MyExportCSV {...props.csvProps} />
              {/* <SearchBar {...props.searchProps} /> */}
              <input type="text" className="form-control " placeholder="Search" onKeyUp={(e) => { _handleKeyUP(e); }} />
              <hr />
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
