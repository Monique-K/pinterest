import React, { Component } from 'react';
import { modal } from 'bulma';
import * as firebase from 'firebase';
import './login.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      github: "",
      password: "",
    }
  }

  componentDidMount = () => {
    this.setState({
      isActive: this.props.active
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isActive !== prevProps.active) {
      this.setState({isActive: this.props.active})
    }
  }

  updateGithub = (e) => {
    this.setState({github: e.target.value})
  }

  updatePassword = (e) => {
    this.setState({password: e.target.value})
  }

  closeModal = () => {
    this.setState({isActive: false})
  }

  
    githubLogin = () => {
      const provider = new firebase.auth.githubAuthProvider();
      firebase.auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user
        console.log(user)
      })
    }
  

  render() {
    return (
      <div className={`modal ${this.state.isActive ? "is-active" : null }`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <h3 className="login-title">Log in or Register</h3>
          <form className="login-form">
            <input placeholder="Github" value={this.state.github} onChange={(e) => this.updateGithub(e)}></input>
            <input placeholder="Password" value={this.state.password} onChange={(e) => this.updatePassword(e)}></input>
            <button className="button" type="submit" onClick={this.githubLogin}>Login</button>
          </form>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={this.closeModal}></button>
      </div>
    );
  }
}

export default Login;
