import React from 'react';
import './picture.scss';

const renderStar = (isStar) => {
  if (isStar.starred === "true") {
      return (<i className="fas fa-star" onClick={isStar.function}></i>)
  } if (isStar.starred === "false") {
    return (<i className="far fa-star" onClick={isStar.function}></i>)
  } 
}

export const pictureDiv = (src, alt, key, isStarred, starNum) => {

  return (
    <div className="picture-div" key={key}>
      <img className="image" src={`${src}`} alt={alt}></img>
      <div className="bottom-bar">
        {renderStar(isStarred)} <p>{starNum > 0 ? starNum : null}</p>
      </div>
    </div>
  )
}