import React from "react";
import { Button } from "react-bootstrap";

const MyExportCSV = props => {
  const { onExport } = props;

  const handleClick = () => {
    onExport();
  };

  return (
    <Button
      onClick={handleClick}
      style={{

        backgroundColor: "#37BBA5",
        borderColor: "#37BBA5"

      }}
    >
      Export CSV
    </Button>
  );
};

export default MyExportCSV;
