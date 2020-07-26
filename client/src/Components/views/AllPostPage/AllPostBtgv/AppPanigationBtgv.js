import React from 'react';
import axios from 'axios'
import Panigation from './Panigation';
import { Link } from 'react-router-dom'

class AppPanigation extends React.Component {
    constructor() {
        super();

        // an example array of 150 items to be paged
        // var listItem = [...Array(100).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));

        this.state = {
            // exampleItems: listItem,
            pageOfItems: [],
            blogs: []
        };
    }

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount() {
        this.fetData()
    }


    fetData() {
        axios.get(`/api/blog1/getBlogs`)
            .then(response => {

                console.log('DMM', response.data.blogs1)
                if (response.data) {
                    this.setState({
                        blogs: response.data.blogs1
                    })
                }
            })
    }

    compare = (a, b) => {
        let comparison = 0
        if (a._id > b._id) {
            comparison = 1;
        } else if (a._id < b._id)
            comparison = -1;
        return comparison * -1;
    }



    render() {
        return (
            <div style={{marginTop:"30px"}}>
                <div className="text-center">
                    <h3 className="text-center">THÔNG BÁO KHÁC</h3>
                    <hr />
                    {this.state.pageOfItems.map((item,index)=>
                        <div key={item._id}>

                         
                                <Link to={`/blog1/post/detail/${item._id}`} key={item._id}>{item.title}</Link>
                          
                        </div>
                    )}
                    <Panigation items={this.state.blogs.sort(this.compare)} onChangePage={this.onChangePage} />

                </div>
            </div>
        );
    }

}

export default AppPanigation;