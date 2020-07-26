import React, { Component } from 'react'
import queryString from 'query-string'

export default class TestQuery extends Component {

    onSetQuery=()=>{
        this.props.history.push({
            pathname: '/query/',
            search: '?color=white'
          })
    }
    render() {
        console.log("PRPOSQE",this.props)
        const values = queryString.parse(this.props.location.search)
        console.log("QUERY",values.title)
        console.log("QUERY", this.props.location)
        return (
            <div>
               <button className="btn btn-primary" onClick={this.onSetQuery}>Set queryString</button>
            </div>
        )
    }
}
