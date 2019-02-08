import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import Pictures from './pictures/pictures';
import firebase from 'firebase';
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
      return "Browse Images"
    }
    if (this.state.loggedIn === true) {
      if (this.state.searchFilter === "") {
        return "Your Starred Images"
      }
    } if (this.setState.searchFilter !== "") {
      console.log("should work")
      return `${this.state.searchFilter}'s Images`
    }
  }

  goHome = () => {
    this.setState({searchFilter: ""})
  }

  provider = new firebase.auth.GithubAuthProvider();

  githubSignin = () => {
    firebase.auth().signInWithPopup(this.provider)
    .then((result) => {
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
      this.setState({loggedIn: true, username: user.displayName})
    }).catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.message;
    
      console.log(errorCode)
      console.log(errorMessage)
    });
  }

  githubSignOut = () => {
    firebase.auth().signOut()
    .then(() => {
      this.setState({loggedIn: false, username: ""})
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
          goHome={this.goHome}
        />
        <Login active={this.state.modalIsActive} action={this.handleLoginClick} />
        <div className="main">
          
        </div>
        <div className="main-title">{this.setTitle()}</div>
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

- logged in, get shortened url to image i starred: share button

- redux 

- show owner name on pic?

- switch config to env files 


*/

