import React, { Component } from 'react';
import Nav from './nav/nav';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      loggedIn: false,
    }
  }


  render() {
    return (
      <div className="App">
        <Nav username={this.state.username} loggedIn={this.state.loggedIn}/>
      </div>
    );
  }
}

export default App;
