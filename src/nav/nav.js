import React, { Component } from 'react';
import './nav.scss';

export default class Nav extends Component {
  constructor() {
    super();
    this.state = {
      searchText: ""
    }
  }

  componentDidMount = () => {
    this.setState({
      username: this.props.username,
      loggedIn: this.props.loggedIn
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedIn !== prevProps.loggedIn || this.props.username !== prevProps.username) {
      this.setState({
        username: this.props.username,
        loggedIn: this.props.loggedIn
      })
    }
    if (this.props.filter !== prevProps.filter) {
      this.setState({filter: this.props.filter})
    }
  }

  welcomeLoginDiv = () => {
    if (!this.state.loggedIn) {
      return (
        <div className="login-section">
          <button className="button" onClick={this.props.signIn}>Github Sign In</button>
        </div>
      )
    } else {
      return (
        <div className="welcome-user">
          <div className="welcome">Welcome {this.state.username}!</div>
          <button className="button" onClick={this.props.signOut}>Sign Out</button>
        </div>
      )
    }
  }

  handleSearchText = (e) => {
    this.setState({searchText: e.target.value})
  }

  

  render() {
    return (
      <div className="nav-container">
        <div className="logo-container">
          <i className="fas fa-cat nav-logo fa-3x"></i> 
          <p>Cat <br />Pinterest</p>
        </div>
        <form onSubmit={(e) => this.props.submit(e, this.state.searchText)}>
          <input 
            className="search-input" 
            placeholder="Search users" 
            value={this.state.searchText} 
            onChange={(e) => this.handleSearchText(e)}
            >
          </input>
        </form>
        <div className="welcome-login-section">
          {this.welcomeLoginDiv()}
        </div>
      </div>
    )
  }

}