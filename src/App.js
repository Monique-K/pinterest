import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import Pictures from './pictures/pictures';
import * as firebase from 'firebase/app';
// import 'firebase/<PACKAGE>';
import './App.scss';


firebase.initializeApp(this);

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      loggedIn: false,
      modalIsActive: false,
    }
  }

  // db = firebase.database().ref('images')

  


  githubLogin = () => {
    const provider = new firebase.auth.githubAuthProvider();
    firebase.auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user
      console.log(user)
    })
  }


  handleLoginClick = () => {
    console.log("click")
    this.setState({modalIsActive: true})
  }

provider = new firebase.auth.GithubAuthProvider();

githubSignin = () => {
  console.log("worked")
  firebase.auth().signInWithPopup(this.provider)
  
  .then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
  
    console.log(token)
    console.log(user)
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  
    console.log(error.code)
    console.log(error.message)
  });
}

githubSignout = () => {
  firebase.auth().signOut()
  
  .then(function() {
    console.log('Signout successful!')
  }, function(error) {
    console.log('Signout failed')
  });
}

  render() {
    // console.log("DB:", this.db)
    return (
      <div className="App">
        <Nav username={this.state.username} loggedIn={this.state.loggedIn}/>
        <Login active={this.state.modalIsActive} action={() => this.handleLoginClick()} />
        <div className="main">
          <button onClick={this.githubSignin}>Github Signin</button>
          <button onClick={this.githubSignout}>Github Signout</button>
        </div>
        <Pictures />
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