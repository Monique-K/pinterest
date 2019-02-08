import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import Pictures from './pictures/pictures';
import firebase from 'firebase';
// import admin from 'firebase-admin';
import { config } from './firebase/firebase';
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
      searchFilter: "",
      title: ""
    }
  }

  setTitle = () => {
    if (this.state.loggedIn === false) {
      this.setState({title: "Browse Images"})
      return 
    }
    if (this.state.loggedIn === true) {
      if (this.state.searchFilter === "") {
        this.setState({title: "Your Starred Images"})
        return 
      }
    } else if (this.setState.searchFilter !== "") {
      this.setState({title: `${this.state.searchFilter}'s Images`})
      return 
    }
  }

  componentDidMount = () => {
    this.setTitle()
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.state.title !== this.prevState) {
  //     this.setTitle()
  //   }
  // }

  provider = new firebase.auth.GithubAuthProvider();

  githubSignin = () => {
    firebase.auth().signInWithPopup(this.provider)
    
    .then((result) => {
      // var token = result.credential.accessToken;
      const user = result.user;

      firebase.database().ref('users').on('value', (snapshot) =>{
        let keys = Object.keys(snapshot.val())
        if (!keys.includes(user.displayName)) {
          // Add a new user to the users database
          firebase
          .database()
          .ref(`users/${user.displayName}`)
          .set({
            name: user.displayName
          })
        }
      })
      // console.log(token)
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
      console.log('Signout failed', error)
    });
  }

  onSearchSubmit = (e, text) => {
    e.preventDefault()
    this.setState({searchFilter: text})
  }

  render() {  
    return (
      <div className="App">
        <Nav 
          username={this.state.username} 
          loggedIn={this.state.loggedIn} 
          signIn={this.githubSignin}
          signOut={this.githubSignOut}
          submit={this.onSearchSubmit}
        />
        <Login active={this.state.modalIsActive} action={this.handleLoginClick} />
        <div className="main">
          
        </div>
        <div className="main-title">{this.state.title}</div>
        <Pictures 
          loggedIn={this.state.loggedIn} 
          user={this.state.username}
          filter={this.state.searchFilter} 
        />
      </div>
    );
  }
}

export default App;


/*
To Do: 

- star and unstar pics if signed in
- logged in, get shortened url to image i starred: share button
- signout not working

- redux

- show owner name on pic?

- switch config to env files 

-fix starred length

- remove http2 and firebase admin if not used


*/

