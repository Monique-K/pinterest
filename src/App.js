import React, { Component } from 'react';
import Nav from './nav/nav';
import Login from './login/login';
import Pictures from './pictures/pictures';
import * as firebase from 'firebase/app';
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
        <Nav 
          username={this.state.username} 
          loggedIn={this.state.loggedIn} 
          signIn={this.githubSignin}
          signOut={this.signOut}
        />
        {/* <Login active={this.state.modalIsActive} action={this.handleLoginClick} /> */}
        <div className="main">
          
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

- switch config to env files 



Q {G: Array(0), m: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk", o: "[DEFAULT]", u: "pinterest-f1e4b.firebaseapp.com", b: Jh, …}
G: []
I: true
N: [ƒ]
O: []
Rb: Q {G: Array(0), m: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk", o: "[DEFAULT]", u: "pinterest-f1e4b.firebaseapp.com", b: Jh, …}
V: ƒ ()
Va: null
W: bm {m: false, settings: Rk, app: FirebaseAppImpl, b: Jh, N: Array(0), …}
X: bm {m: false, settings: Rk, app: FirebaseAppImpl, b: Jh, N: Array(0), …}
a: yk {u: "pinterest-f1e4b.firebaseapp.com", l: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk", m: "[DEFAULT]", h: Array(2), f: true, …}
b: Jh {b: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk", i: "https://securetoken.googleapis.com/v1/token", l: Ce, f: {…}, g: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/", …}
ba: Pl {a: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk:[DEFAULT]", b: Kj}
displayName: "Monique Khoury"
email: "mkhoury87@hotmail.com"
emailVerified: false
h: Yk {f: Jh, a: "AGK09AMX54xjVu9-v66qqFBr4Q6ZFDMRYwj_dvdPXSVq8sIUIS…r3glWaZm1Q2RQUi68n1VW6qta-ImQ6rkQOla-6cp7NR5rE6bZ", b: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZTQ2MGZmM2EzZDQ2ZG…2dhaHnwLSch5_GNsz1pi5guhOS9rplseqWI98ATHzbg1xFCKA", c: 1549474432853}
i: null
isAnonymous: false
ja: undefined
ka: null
l: lc {src: Q, a: {…}, b: 3}
m: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk"
metadata: cl {a: "1549470193000", b: "1549470775151", lastSignInTime: "Wed, 06 Feb 2019 16:32:55 GMT", creationTime: "Wed, 06 Feb 2019 16:23:13 GMT"}
o: "[DEFAULT]"
phoneNumber: null
photoURL: "https://avatars2.githubusercontent.com/u/39163824?v=4"
providerData: [el]
qa: false
ra: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZTQ2MGZmM2EzZDQ2ZGZlYzcyNGQ4NDg0ZjczNDc2YzEzZTIwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGludGVyZXN0LWYxZTRiIiwibmFtZSI6Ik1vbmlxdWUgS2hvdXJ5IiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFyczIuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMzkxNjM4MjQ_dj00IiwiYXVkIjoicGludGVyZXN0LWYxZTRiIiwiYXV0aF90aW1lIjoxNTQ5NDcwODE3LCJ1c2VyX2lkIjoiQkZkUEtmODRVa1R6VHZRTzRNT2Y1c1ZVT0QzMiIsInN1YiI6IkJGZFBLZjg0VWtUelR2UU80TU9mNXNWVU9EMzIiLCJpYXQiOjE1NDk0NzA4MTcsImV4cCI6MTU0OTQ3NDQxNywiZW1haWwiOiJta2hvdXJ5ODdAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ2l0aHViLmNvbSI6WyIzOTE2MzgyNCJdLCJlbWFpbCI6WyJta2hvdXJ5ODdAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnaXRodWIuY29tIn19.bffn7E9eufORaTwhiqp1ihlV8iXOM-47bRAPwYw17hJ85T80fJrhiFkJaadI3erFNdFFOpW7ISiTy69x8FydBrykj-6m3IXh6CA4CzFJu80qnMg01qJPT22hrrRCuCypJK87-fDK_2LKBUn0EMlWsN1O39roegw1Hp8R4qY2W3EmvFNWoBY3cPevdsMCmIA2tBNU_cfy_HsxfP3TClCUAuOn-lubNvZE5I5iQWHWOYV-XsOoCZURcnufaZ7z9SRkd6rEDFW2eFNicLa8TLUyFeNAoqFeXbhMnSvBfCl1HkbCPfEjzeS2dRFTtQ4lkkqaY5AQi2cpYfX6wERbE1tVmA"
refreshToken: "AGK09AMX54xjVu9-v66qqFBr4Q6ZFDMRYwj_dvdPXSVq8sIUISX7epzudkZtVwkuxn_yQkTNeLw572c7lpcOr445ZU44l8kTaw38l-Ti9x8wRzR3tz1Qi2JaY16v1Tx0FP38uINXkCLm2TLRo4cPBKkU7rQxpKuMu_adVlKtvQ-X1_yGiJhthZ6itLtcRI-Mc0FNAcfrJlOUXZpi8vJiBhVtKJnplt3MIlJIsG_Mv9lHfc3Rd2hunkhy_tFhk7hpjjTmfXiPk-96P3mhu50QH-8ZLk9r3glWaZm1Q2RQUi68n1VW6qta-ImQ6rkQOla-6cp7NR5rE6bZ"
sa: ƒ (a)
ta: ƒ (a)
u: "pinterest-f1e4b.firebaseapp.com"
uid: "BFdPKf84UkTzTvQO4MOf5sVUOD32"
w: Vk {h: ƒ, i: ƒ, g: ƒ, c: 30000, f: 960000, …}
_lat: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZTQ2MGZmM2EzZDQ2ZGZlYzcyNGQ4NDg0ZjczNDc2YzEzZTIwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGludGVyZXN0LWYxZTRiIiwibmFtZSI6Ik1vbmlxdWUgS2hvdXJ5IiwicGljdHVyZSI6Imh0dHBzOi8vYXZhdGFyczIuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMzkxNjM4MjQ_dj00IiwiYXVkIjoicGludGVyZXN0LWYxZTRiIiwiYXV0aF90aW1lIjoxNTQ5NDcwODE3LCJ1c2VyX2lkIjoiQkZkUEtmODRVa1R6VHZRTzRNT2Y1c1ZVT0QzMiIsInN1YiI6IkJGZFBLZjg0VWtUelR2UU80TU9mNXNWVU9EMzIiLCJpYXQiOjE1NDk0NzA4MTcsImV4cCI6MTU0OTQ3NDQxNywiZW1haWwiOiJta2hvdXJ5ODdAaG90bWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ2l0aHViLmNvbSI6WyIzOTE2MzgyNCJdLCJlbWFpbCI6WyJta2hvdXJ5ODdAaG90bWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnaXRodWIuY29tIn19.bffn7E9eufORaTwhiqp1ihlV8iXOM-47bRAPwYw17hJ85T80fJrhiFkJaadI3erFNdFFOpW7ISiTy69x8FydBrykj-6m3IXh6CA4CzFJu80qnMg01qJPT22hrrRCuCypJK87-fDK_2LKBUn0EMlWsN1O39roegw1Hp8R4qY2W3EmvFNWoBY3cPevdsMCmIA2tBNU_cfy_HsxfP3TClCUAuOn-lubNvZE5I5iQWHWOYV-XsOoCZURcnufaZ7z9SRkd6rEDFW2eFNicLa8TLUyFeNAoqFeXbhMnSvBfCl1HkbCPfEjzeS2dRFTtQ4lkkqaY5AQi2cpYfX6wERbE1tVmA"
__proto__: F

*/

