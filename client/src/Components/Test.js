import React, { Component } from 'react'
import Countdown from 'react-countdown';
import axios from 'axios'
import { ToastBody } from 'react-bootstrap';

export default class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: 18,
            month: 3,
            year: 2020,
            hours: 0,
            minutes: 0,
            seconds: 0,
            subTime: []

        }
    }

    componentDidMount() {
        axios.get(`/subject/subTime/5e93d4ce68b84c33f8ec584d`)
            .then(response => {

                if (response) {
                    this.setState({
                        subTime: response.data

                    })
                } else {
                    alert("error when post")
                }
            })
    }


    onDateChange = (event) => {
        this.setState({
            date: event.currentTarget.value
        })
    }

    onMonthChange = (event) => {
        this.setState({
            month: event.currentTarget.value
        })
    }

    onYearChange = (event) => {
        this.setState({
            year: event.currentTarget.value
        })
    }
    onSubmit = () => {

        const variable = {
            date: this.state.date,
            month: this.state.month,
            year: this.state.year
        }

        axios.put(`/subject/putdate/5e93d4ce68b84c33f8ec584d`, variable)
            .then(response => {

                if (response) {
                    alert("Put success")
                } else {
                    alert("error when put")
                }
            })

        // setTimeout(() => {
        //     props.history.push('/subject/detail/5e93d4ce68b84c33f8ec584d')
        // }, 1000);

    }



    render() {

        const Completionist = () => <span>You are good to go!</span>;

        const renderer = ({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                // Render a completed state
                return <div></div>;
            } else {
                // Render a countdown

                return (
                    <div>
                        <Completionist />
                        <h4>{days} Day {hours} Hour {minutes} minute {seconds} Second</h4>
                    </div>
                )
            }
        };

        const dates = new Date(this.state.subTime.year, this.state.subTime.month - 1, this.state.subTime.date, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
        const dates1 = new Date(2020, 3, 19, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
        const dates2 = Date.now()

      
        return (
            <div>
                <input
                    placeholder="Date"
                    onChange={this.onDateChange} />
                <input
                    placeholder="Month"
                    onChange={this.onMonthChange} />
                <input
                    placeholder="Year"
                    onChange={this.onYearChange} />
                <button onClick={this.onSubmit}>Submit</button>
                <Countdown
                    date={Date.now() + 5000}
                    renderer={renderer}
                />

                <div>DateSet: {dates.getDate()}</div>
                <div>Today: {new Date().getDate()}</div>
                <div>{dates.getDate() - new Date().getDate()}</div>
                <div>{typeof (dates)}</div>
            </div>
        )
    }
}