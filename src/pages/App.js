import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtocolList from './ProtocolList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={ProtocolList} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
