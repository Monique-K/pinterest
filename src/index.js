
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Enable the firebase context for the backend
import Firebase, { FirebaseContext } from './firebase/index';


ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>, 
  document.getElementById('root')
  );


serviceWorker.unregister();
