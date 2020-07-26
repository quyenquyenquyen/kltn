import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid } from '@material-ui/core'
import { useAlert } from "react-alert";


export default function ListResult(props) {
    const alert = useAlert();
    const [subArr, setSubArr] = useState([])
    var total1 = 0, total2 = 0
    const [listuser, setListuser] = useState([])
    let sum = a => a.reduce((x, y) => x + y)

    useEffect(() => {
        axios.get(`/subject/5ee8400d52ffb33e94d3d7fc`)
            .then(res => {
                setSubArr(res.data.subjectArr)
                console.log('listuser',res.data.subjectArr.filter(x=>x.user==="1613100"))
               
            })
            axios.get(`/subject/5ee34b0fbd46141cdcf24fc4`)
            .then(res => {
                setListuser(res.data.userArr)
            })
    }, [])

    const render = listuser.map((sub) => {
        return (
            <div>
                <div> {sub.username}</div>
                <a style={{ color: "red" }}>{
                    subArr.filter(x => x.user === sub.username).length === 0 ? 'null':sum(subArr.filter(x => x.user === sub.username).map(x => Number(x.point)))
                }</a>
            </div>
        )

    })


    const caculator = () => {
        // const result = subArr.filter(x => x.user === "1613163")
        let totalAmount = sum(subArr.filter(x => x.user === "1613163").map(x => Number(x.point)))

        alert.info(sum(subArr.filter(x => x.user === "1613163").map(x => Number(x.point))))
    }

    return (
        <div>
            <button onClick={caculator}>Caculator</button>
            <Grid container>
                <div>{render}</div>
            </Grid>

        </div>
    )
}