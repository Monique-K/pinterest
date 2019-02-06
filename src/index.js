
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as firebase from 'firebase/app';
import * as serviceWorker from './serviceWorker';

// Enable the firebase context for the backend
// import Firebase, { FirebaseContext } from './firebase/index';

const config = {
  apiKey: "AIzaSyAaDJ2T382V0s6cM9p4zb6nIhgXcb09Vwk",
  authDomain: "pinterest-f1e4b.firebaseapp.com",
  databaseURL: "https://pinterest-f1e4b.firebaseio.com",
  projectId: "pinterest-f1e4b",
  storageBucket: "pinterest-f1e4b.appspot.com",
  messagingSenderId: "549236728825"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
  // <FirebaseContext.Provider value={new Firebase()}>
  //   <App />
  // </FirebaseContext.Provider>, 


serviceWorker.unregister();
