import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let {title, discription, imgUrl, newsUrl,author,date, source} = this.props
    
    return (
      <div className="my-3">
        <div className="card">
        <img src={imgUrl} className="card-img-top" style={{width: "100%", height: "250px"}} alt="...not Available"/>
        <div className="card-body">
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
        {source}</span>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{discription}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}
