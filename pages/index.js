import React from "react";

import { Row,Col } from "react-bootstrap";

import NavbarMenu from "../component/navbar";

class Page extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }
  constructor(props) {
    super(props);    
  }


  render() {
    console.log(process.env.SOCKET_CLIENT);
    
    return (
      <div>
      
        <NavbarMenu />
        
        <img src="https://enterprise.zanroo.com/wp-content/themes/zanroo/images/logo.svg" alt="Zanroo" width={"100%"} style={{padding:"200px"}}/>
      </div>
    );
  }
 
}

export default Page;
