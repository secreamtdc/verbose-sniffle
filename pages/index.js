import React from "react";

import { Row,Col } from "react-bootstrap";

import NavbarMenu from "../component/navbar";
import Head from "next/head";

import "../style.css"
import "../normalize.css"

class Page extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }
  constructor(props) {
    super(props);

    this.state = {

    };

  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Head>
          <title>Zin</title>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
          />
          <script
            src="https://unpkg.com/react/umd/react.production.js"
            crossorigin
          />

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.js"
            crossorigin
          />

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin
          />
        </Head>
        <NavbarMenu />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col md={2}></Col>
          <Col md={8}><img src="https://enterprise.zanroo.com/wp-content/themes/zanroo/images/logo.svg" alt="Zanroo" width={"100%"}/></Col>
          <Col md={2}></Col>
        </Row>
      </div>
    );
  }
 
}

export default Page;
