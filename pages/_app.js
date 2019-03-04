import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'


import "../style/style.css"

import "../style/admin.css"
import "../style/arun-style.css"
import "../style/style-responsive.css"


import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

import {Provider}  from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
 
import {createStore, combineReducers} from 'redux'
import {reducer as toastrReducer} from 'react-redux-toastr'
const reducers = {
  // ... other reducers ...
  toastr: toastrReducer // <- Mounted at toastr.
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

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
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous"></link>
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
        
        <Provider store={store}>
          <div>
          <Component {...pageProps} />
            <ReduxToastr
                 timeOut={4000}
                 newestOnTop={false}
                 preventDuplicates
                 position='bottom-right'
                 transitionIn='fadeIn'
                 transitionOut='fadeOut'
                 progressBar
                 y/>
          </div>
        </Provider>
      </Container>
      
    )
  }
}

export default MyApp