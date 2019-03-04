import React from 'react'

const MyExportCSV = props => {
  const { onExport } = props

  const handleClick = () => {
    onExport()
  }

  return (
    <div>
      <button
        className="btn"
        style={{ backgroundColor: "#37BBA5" }}
        onClick={handleClick}
        style={{
          marginBottom: "10px",
          backgroundColor: "#37BBA5",
          color: "white"
        }}
      >
        Export to CSV
      </button>
    </div>
  );
};

export default MyExportCSV