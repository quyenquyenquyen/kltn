import axios from 'axios'
import React from 'react';

export default function ImageItem(props) {


    const filename = props.match.params.filename;

    return (
        <div>
            <img src={`/up/image/${filename}`} alt="Hinhanh" style={{ width: '200px' }} />
        </div>
    )
}
