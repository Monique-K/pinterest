import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      loggedIn: false,
      modalIsActive: false,
    }
  }

  handleLoginClick = () => {
    console.log("click")
    this.setState({modalIsActive: true})
  }

  render() {
    return (
      <div className="App">
        <Nav username={this.state.username} loggedIn={this.state.loggedIn}/>
        <Login active={this.state.modalIsActive} action={() => this.handleLoginClick()} />
      </div>
    );
  }
}

export default App;


/*
To Do: 

- set state of app when modal opens or closes
- register with github
- render pic divs
- cant close modal if app says its false

- set up backend db




*/