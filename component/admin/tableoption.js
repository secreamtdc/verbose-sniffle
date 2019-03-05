import React from "react";
export default props => {
    
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
      headerFormatter: returnHeader,
      formatter: iconID
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
      csvExport: false,
      formatter: changeRoleFormatter,
      headerFormatter: returnHeader
    },
    {
      dataField: "_id",
      text: "Remote Login",
      formatter: remoteFormatter,
      csvExport: false,
      headerFormatter: returnHeader
    },
    {
      dataField: "_id",
      text: "Change Password",
      formatter: changePasswordFormatter,
      csvExport: false,
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

  function changePasswordFormatter(cell, row) {
    return <ChangePass row={row} />;
  }
  function iconID(cell, row) {
    return (
      <div>
        <IdOption _id={cell} copied={copied}/>
      </div>
    );
  }

  function remoteFormatter(cell, row) {
    return (
      <Button
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

}