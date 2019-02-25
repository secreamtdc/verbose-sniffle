import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'

import "../style.css"
import "../normalize.css"
class MyApp extends App {
  constructor(props) {
    super(props)
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Se'cream</title>
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0 user-scalable=0" />
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
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp