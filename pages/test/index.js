import React, { Component } from 'react';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export class App extends Component {
  render() {
    return (
      <Grid className="App-container" fluid>
        {
          // write your code here
        }
      </Grid>
    );
  }
}
export default DragDropContext(HTML5Backend)(App);