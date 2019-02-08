import React, { Component } from 'react';
import * as firebase from 'firebase/app';
import { pictureDiv } from '../picture/picture';
import './pictures.scss'; 


export default class Pictures extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  componentDidMount = () => {
    firebase.database().ref('images').on('value', (snapshot) => {
      this.setState({
        db: snapshot.val(), 
        loggedIn: this.props.loggedIn, 
        user: this.props.user, 
        filter: this.props.filter
      })
    })
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      this.setState({
        loggedIn: this.props.loggedIn, 
        user: this.props.user, 
        filter: this.props.filter
      })
    }
  }

  showStarredImg = (img, num) => {
    let starredArray = img.starred
    if (this.state.user){
      if (starredArray.includes(this.state.user)) {
        let index = starredArray.indexOf(this.state.user)
        starredArray.splice(index, 1)
        const star = {
          starred: "true",
          function: () => {
            console.log("new like array", starredArray)
            firebase
            .database()
            .ref(`images`).child(num)
            .update({
              starred: starredArray
            })
          }
        }
        return star
      } else {
        starredArray.push(this.state.user)
        const star = {
          starred: "false",
          function: () => {
            console.log("new like array", starredArray)
            firebase
            .database()
            .ref(`images`).child(num)
            .update({
              starred: starredArray
            })
          }
        }
        return star
      }
    } else {
      const star = {
        starred: "false",
        function: () => {}
      }
      return star
    }
  }
  

  renderPictures = () =>  {
    if (this.state.db) {
      const divArray = []
      let count = 0
      // Unauthenicated users see all images
      if (!this.state.loggedIn) {
        this.state.db.forEach(cat => {
          let starNum = cat.starred.length 
          let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
          let div = pictureDiv(cat.url, "cat", count, isStarred, starNum)
          count ++
          divArray.push(div)
        })
        return divArray
      } 
      // logged in users can filter images
      if (this.state.loggedIn) {
        if (this.state.filter === "") {
          // before adding a search filter, logged in users see their starred images only
          this.state.db.forEach(cat => {
            if (cat.starred.includes(this.state.user)) {
              let starNum = cat.starred.length 
              let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
              let div = pictureDiv(cat.url, "cat", count, isStarred, starNum)
              count ++
              divArray.push(div)
            }
          })
          return divArray
        }
      } 
      // after searching for a user, logged in users see images owned or starred by that user
      if (this.state.filter !== "") {
        this.state.db.forEach(cat => {
          if (cat.owner === this.state.filter || cat.starred.includes(this.state.filter)) {
            let starNum = cat.starred.length 
            let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
            let div = pictureDiv(cat.url, "cat", count, isStarred, starNum)
            count ++
            divArray.push(div)
          }
        })
        return divArray
      }
    }
  }

  render() {
    return (
      <div className="pictures-container">
        {this.renderPictures()}
      </div>
    )
  }
}