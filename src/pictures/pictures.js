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

  // render empty stars if no authenticated user, or if authenticated user has not starred that image
  // render a solid star if the authenticated user has starred that image
  showStarredImg = (img, num) => {
    let starredArray = img.starred
    if (this.state.user){
      if (starredArray.includes(this.state.user)) {
        let index = starredArray.indexOf(this.state.user)
        starredArray.splice(index, 1)
        const star = {
          starred: "true",
          function: () => {
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

  share = () => {
    
  }
  

  renderPictures = () =>  {
    if (this.state.db) {
      const divArray = []
      let count = 0
      // unauthenticated users
      if (this.state.loggedIn === false) {
        if (this.state.filter === "") {
          // Unauthenicated users see all images before searching
          this.state.db.forEach(cat => {
            let starNum = cat.starred.length 
            let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
            let div = pictureDiv(cat.url, "cat", count, isStarred, starNum, false)
            count ++
            divArray.push(div)
          })
          return divArray
        } else if (this.state.filter !== "") {
          // after searching for a user, see images owned or starred by that user
          this.state.db.forEach(cat => {
            if (cat.owner === this.state.filter || cat.starred.includes(this.state.filter)) {
              let starNum = cat.starred.length 
              let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
              let div = pictureDiv(cat.url, "cat", count, isStarred, starNum, true, cat.url)
              count ++
              divArray.push(div)
            }
          })
          return divArray
        }
      }
      // authenticated users 
      if (this.state.loggedIn === true) {
        if (this.state.filter === "") {
          // before adding a search filter, authenticated users see their starred images only
          this.state.db.forEach(cat => {
            if (cat.starred.includes(this.state.user)) {
              let starNum = cat.starred.length 
              let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
              let div = pictureDiv(cat.url, "cat", count, isStarred, starNum, true, cat.url)
              count ++
              divArray.push(div)
            }
          })
          return divArray
        } else if (this.state.filter !== "") {
          // after searching for a user, see images owned or starred by that user
          this.state.db.forEach(cat => {
            if (cat.owner === this.state.filter || cat.starred.includes(this.state.filter)) {
              let starNum = cat.starred.length 
              let isStarred = this.showStarredImg(cat, this.state.db.indexOf(cat))
              let div = pictureDiv(cat.url, "cat", count, isStarred, starNum, true, cat.url)
              count ++
              divArray.push(div)
            }
          })
          return divArray
        }
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