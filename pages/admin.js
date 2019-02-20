import React from "react";
import axios from "axios";
import _ from "lodash";
import { Button } from "react-bootstrap";

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
      persons: []
    };

  }
  componentDidMount() {
    console.log("componentDidMount");
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

          {/* <script>var Alert = ReactBootstrap.Alert;</script> */}
        </Head>
        <NavbarMenu />
        <p>{this.state.persons.data}</p>
        <button onClick={()=>{
            this.setState({ persons :{data:555}})
            console.log(this.state.persons);
        }}>
        555
        </button>
      </div>
    );
  }
}

export default Page;
