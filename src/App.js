import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import Pictures from './pictures/pictures';
import firebase from 'firebase';
import { config } from './firebase/firebase';
// import * as firebase from 'firebase/app';
import './App.scss';



class App extends Component {
  constructor() {
    super();

    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child("url")

    this.state = {
      username: "",
      loggedIn: false,
      modalIsActive: false,
    }
  }

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
  firebase.auth().signInWithPopup(this.provider)
  
  .then((result) => {
    // var token = result.credential.accessToken;
    var user = result.user;
  
    // console.log(token)
    console.log(user)
    this.setState({loggedIn: true, username: user.displayName})
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  
    console.log(errorCode)
    console.log(errorMessage)
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
    // console.log("firebase", this.database)  
    return (
      <div className="App">
        <Nav 
          username={this.state.username} 
          loggedIn={this.state.loggedIn} 
          signIn={this.githubSignin}
          signOut={this.signOut}
        />
        <Login active={this.state.modalIsActive} action={this.handleLoginClick} />
        <div className="main">
          
        </div>
        <Pictures loggedIn={this.state.loggedIn} user={this.state.username} />
      </div>
    );
  }
}

export default App;


/*
To Do: 

- star and unstar pics if signed in

- switch config to env files 

-imgs show up squished until hover

-fix starred length


*/

