import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
export default class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : 5,
        category : 'general'
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }
   constructor(){
        super();
        this.state = {
            article : [],
            loading : false,
            page : 1,
        }
    }
    
   async componentDidMount(){
    this.setState({
        loading : true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=399b6fee8fcd46658890dfb42e4a6e36&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData.articles);
    this.setState({article: parsedData.articles, 
        totalResults : parsedData.totalResults, 
        loading : false})
   }

   handlePrev =async ()=>{
    console.log("Previous");
    this.setState({
        loading : true
    })
    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=399b6fee8fcd46658890dfb42e4a6e36&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        page : this.state.page - 1,
        article: parsedData.articles,
        loading : false
    })
   }

   handleNext = async ()=>{
    console.log("Next")
    this.setState({
        loading : true
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=399b6fee8fcd46658890dfb42e4a6e36&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        page : this.state.page + 1,
        article: parsedData.articles,
        loading : false
    })
   }

  render() {
    return (
      <div className="container my-5">
        <h1 className='text-center'>RapidCurrent - Top Headlines</h1>
        {this.state.loading&&<Spinner/>}
          <div className="row">
         {!this.state.loading && this.state.article.map((element)=>{
            return<div className="col-md-4" key={element.url} >
                <NewsItem title={element.title?element.title.slice(0,45):""} discription={element.description?element.description.slice(0,88):""} imgUrl={!element.urlToImage?"https://www.shutterstock.com/image-vector/breaking-news-colorful-promotion-template-600nw-2522137259.jpg":element.urlToImage} newsUrl={element.url} author={element.author?element.author.slice(0,20):"Unknown"} date={element.publishedAt.slice(0,10)} source={element.source.name}/>
            </div>
             })}
        </div>
       <div className="container d-flex justify-content-between">
       <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>
        &laquo; Previous
        </button>
       <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNext}>
        Next &raquo;
        </button>
       </div>
      </div>
    )
  }
}
