import React ,{ useState } from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import ChangePasswordModal from './ChagePasswordModal'


export default props =>{
  const [modalShow, setModalShow] = useState(false);

  let modalClose = () => setModalShow( false );

  return (
    <ButtonToolbar>
      <Button
        disabled={props.row.is_removed}
        style={{ fontSize: "12px", fontWeight: "300", padding: "1px 5px" }}
        variant="info"
        size="sm"
        onClick={() => setModalShow( true )}
      >
        Change Password
      </Button>

      <ChangePasswordModal
        show={modalShow}
        onHide={modalClose}
        row={props.row}
      />
    </ButtonToolbar>
  );

}
