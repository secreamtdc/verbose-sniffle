import React from "react";
import { Button, Form } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

import ChangePass from "./changepass";
import MyExportCSV from './ExportButton'

export default props => {
  const {
    _changeRole,
    searchInput,
    accounts,
    roles
  } = props;

  const columns = [
    {
      dataField: "_id",
      text: "#",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {

          cursor: "pointer"
        };
      },
      headerClasses: "border-left-top",
      headerFormatter: returnHeader
    },
    {
      dataField: "name",
      text: "Username",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {

          cursor: "pointer"
        };
      },
      headerFormatter: returnHeader
    },
    {
      dataField: "email",
      text: "Username",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {

          cursor: "pointer"
        };
      },
      headerFormatter: returnHeader
    },
    {
      dataField: "group_docs[0].name",
      text: "group",
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      headerFormatter: returnHeader
    },
    {
      dataField: "_id",
      text: "Role",
      // sort: true,
      csvExport: false,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      formatter: changeRoleFormatter,
      headerFormatter: returnHeader
    },
    {
      dataField: "_id",
      text: "Remote Login",
      formatter: remoteFormatter,
      csvExport: false,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      headerFormatter: returnHeader
    },
    {
      dataField: "_id",
      text: "Change Password",
      formatter: changePasswordFormatter,
      csvExport: false,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      headerClasses: "border-right-top",
      headerFormatter: returnHeader
    },
    {
      dataField: "role_docs[0].name",
      text: "Role",
      hidden: true
    }
  ];

  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (row.is_removed) {
      style.backgroundColor = "#e9e9e9";
      style.cursor = "not-allowed";
      style.userSelect = "none";
      style.opacity = "0.7";
    }

    return style;
  };

  const returnHeader = (column, colIndex) => {
    let word
    switch (colIndex) {
      case 0:
        word = <p>#</p>
        break;
      case 1:
        word = <p>Username</p>
        break;
      case 2:
        word = <p>E-mail</p>
        break;
      case 3:
        word = <p>Group</p>
        break;
      case 4:
        word = <p>Role</p>
        break;
      case 5:
        word = <p>Remote Login</p>
        break;
      case 6:
        word = <p>Change Password</p>
        break;
      default:
        word = ""
        break;
    }
    return word
  }

  function changePasswordFormatter(cell, row) {
    return <ChangePass row={row} />;
  }

  function remoteFormatter(cell, row) {
    return (
      <Button
        disabled={row.is_removed}
        style={{ backgroundColor: "#0E5383", fontSize: "14px" }}
        size="sm"
        block
      >
        Remote Login
      </Button>
    );
  }

  function changeRoleFormatter(cell, row) {
    let option = [];

    roles.forEach(element => {
      option.push(<option value={element._id}>{element.name}</option>);
    });

    return (
      <Form.Control
        style={{ maxWidth: '250px' }}
        disabled={row.is_removed}
        defaultValue={row.role_id}
        as="select"
        onChange={e => {
          _changeRole(row._id, e);
        }}
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
        exportCSV
      // search        
      >
        {
          props => {
            return (
              <div>
                <MyExportCSV {...props.csvProps} />
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search"
                  onKeyUp={e => {
                    searchInput(e);
                  }}
                />
                <hr />
                <BootstrapTable
                  rowStyle={rowStyle}
                  headerClasses="table"
                  {...props.baseProps}
                />
              </div>
            )
          }
        }
      </ToolkitProvider>
    </div>
  );
};