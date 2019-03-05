import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { filter } from "lodash";
import ChangePass from "./changepass";
import MyExportCSV from "./ExportButton";
import IdOption from "./idoption";
import DragGroup from "./DragGroup";

export default props => {
  const {
    _changeRole,
    searchInput,
    accounts,
    roles,
    is_drag = false,
    groupSelect = null
  } = props;

  const data = (is_drag)
    ? filter(accounts, ["group_id", groupSelect._id])
    : accounts;    

  const columns = [
    {
      dataField: "_id",
      text: <p>#</p>,
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      headerClasses: "border-left-top",
      formatter: iconID,
      csvText: 'ID'      
    },
    {
      dataField: "name",
      text: <p>Username</p>,
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      csvText: 'Username'    
    },
    {
      dataField: "email",
      text: <p>E-mail</p>,
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      csvText: 'E-mail'
    },
    {
      dataField: "group_docs[0].name",
      text: <p>Group</p>,
      sort: true,
      headerStyle: (column, colIndex) => {
        return {
          cursor: "pointer"
        };
      },
      csvText: 'Group'
    },
    {
      dataField: "_id",
      text: <p>Role</p>,
      csvExport: false,
      formatter: changeRoleFormatter
    },
    {
      dataField: "_id",
      text: <p>Remote Login</p>,
      formatter: remoteFormatter,
      csvExport: false
    },
    {
      dataField: "_id",
      text: <p>Change Password</p>,
      formatter: changePasswordFormatter,
      csvExport: false,
      headerClasses: "border-right-top"
    },
    {
      dataField: "role_docs[0].name",
      hidden: true,
      csvText: 'Role'
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

  function changePasswordFormatter(cell, row) {
    return <ChangePass row={row} />;
  }
  function iconID(cell, row) {
    let output;
    if (props.is_drag) {
      output = (
        <DragGroup
          txt={<IdOption _id={cell} />}
          id={cell}
          key={cell}
        />
      );
    } else {
      output = <IdOption _id={cell} />;
    }
    return <div>{output}</div>;
  }

  function remoteFormatter(cell, row) {
    return (
      <Button
        disabled={row.is_removed}
        style={{
          backgroundColor: "#0E5383",
          fontSize: "12px",
          fontWeight: "300",
          padding: "1px 5px"
        }}
        size="sm"
      >
        Remote Login
      </Button>
    );
  }
  function changeRoleFormatter(cell, row) {
    console.log('changeRoleFormatter');
    
    let option = [];
    roles.forEach(element => {
      option.push(<option value={element._id}>{element.name}</option>);
    });
    return (
      <Form.Control
        style={{ maxWidth: "250px", fontSize: "12px" }}
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
      <div class="table-responsive">
        <ToolkitProvider keyField="id" data={data} columns={columns} exportCSV>
          {props => {
            return (
              <div>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <MyExportCSV {...props.csvProps} />
                  </InputGroup.Prepend>
                  <FormControl
                    aria-describedby="basic-addon1"
                    placeholder="Search"
                    onKeyUp={e => {
                      searchInput(e);
                    }}
                  />
                </InputGroup>
                <hr />
                <BootstrapTable
                  rowStyle={rowStyle}
                  headerClasses="table"
                  {...props.baseProps}
                  bordered={false}
                />
              </div>
            );
          }}
        </ToolkitProvider>
      </div>
    </div>
  );
};
