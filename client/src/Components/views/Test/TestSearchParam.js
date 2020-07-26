import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import styled from 'styled-components'
import Panigation from './Panigation';



export default class TestSearchParam extends Component {


    constructor(props) {
        super(props)
        var listItem = [...Array(100).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));
        this.state = {
            listSearch: [],
            listSearch1: [],
            arrSearch: [],
            search: this.props.match.params.search,
            pageOfItems: [],
            blogs: listItem,
        }
    }


    componentDidMount() {

        this.props.history.push({
            pathname: `/search/${this.state.search}`,
            search: `?title=${this.state.search}`
          })
        $(function () {
            $('.search-box__input').on('focus', function () {
                $('.search-box__icon').css('color', '#222');
            })
            $('.search-box__input').on('blur', function () {
                $('.search-box__icon').css('color', '#e7e7e7');
            })


        })

    }

    componentWillMount() {

        // =======================================
        axios.get(`/api/blog/test/getBlogs/search?title=${this.state.search}`)
            .then(response => {

                this.setState({
                    listSearch: response.data

                })
                console.log("get")

            })

        axios.get(`/api/blog1/test/getBlogs/search?title=${this.state.search}`)
            .then(response => {

                this.setState({
                    listSearch1: response.data
                })
                this.setState({
                    arrSearch: this.state.listSearch.concat(this.state.listSearch1)
                })
                console.log("get1")

            })
        this.setState({
            arrSearch: this.state.listSearch.concat(this.state.listSearch1)
        })
        console.log("arr")
    }

    onChange = (e) => {
        this.setState({
            search: e.currentTarget.value
        })
    }

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });

    }

    onSubmit = () => {

     
            this.props.history.push({
                pathname: `/search/${this.state.search}`,
                search: `?title=${this.state.search}`
              })
        

        axios.get(`/api/blog/test/getBlogs/search?title=${this.state.search}`)
            .then(response => {

                this.setState({
                    listSearch: response.data

                })
            })

        axios.get(`/api/blog1/test/getBlogs/search?title=${this.state.search}`)
            .then(response => {

                this.setState({
                    listSearch1: response.data
                })

            })
           this.setState({
               arrSearch: this.state.listSearch.concat(this.state.listSearch1)
           })
    }



    render() {
        const { arrSearch} = this.state

        const renderSearch = (
            arrSearch.length !== 0
                ? <Wrapper>
                    {this.state.pageOfItems.map((item,index )=>
                        <div key={item._id} style={{textAlign:"justify",padding:"0.5em 11%"}}>
                             {
                            item.type==="bantinchung"
                            ? <Link to={`/blog/post/detail/${item._id}`} key={item._id}>{item.title}</Link>
                            :  <Link to={`/blog1/post/detail/${item._id}`} key={item._id}>{item.title}</Link>
                           }
                        </div>
                    )}
                    <Panigation items={arrSearch} onChangePage={this.onChangePage} />
                </Wrapper>
           
                : <h4>NO RESULT</h4>

        )

return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>


        <Wrapper>
            <section class="search-box" >

                <div class="search-box__input-wrapper" >
                    <input
                        type="text"
                        class="search-box__input"
                        name="title"
                        onChange={this.onChange}
                        type="text"
                        placeholder="input search"
                    /></div>
                <div class="search-box__button-wrapper">
                    <button style={{padding:"0px"}} className="btn btn-primary" onClick={this.onSubmit}><Link to={`/search/key=${this.state.search}`}><i style={{width:"30px",height:"30px"}} class="fa fa-search search-box__icon"/></Link></button>
                </div>

            </section>
        </Wrapper>

        <hr />
        {renderSearch}

    </div>
)
    }
}

const Wrapper = styled.div`

Link {
    width: 32px;
    height: 32px;
    background-color: red;
  }

*{box-sizing:border-box;}
.search-box{display:grid;padding:3% 10%;}
.search-box__caption{grid-column:1 / 3; margin-bottom:2px; font-size:1.4rem;}
.search-box__input-wrapper{grid-column:1 / 2;border:solid 1px rgb(200,200,200); border-right:none; oveflow:hidden; padding:3px 0;border-top-left-radius:8px;border-bottom-left-radius:8px;}
.search-box__input{border:none;width:100%;padding:6px; font-size:1.2rem; color:#777; background-color:transparent;}
.search-box__input:focus{outline:none;}
.search-box__button-wrapper{grid-column:2 / 3;border:solid 1px rgb(200,200,200); border-left:none; display: flex; justify-content:flex-end; align-items:center;padding-right:5px;
border-top-right-radius:8px;border-bottom-right-radius:8px; cursor:pointer;
}
.search-box__icon{color:#e7e7e7; transition: color 200ms; font-size:1.5rem;}


`