import React from 'react';

import './common.css'

const NextButton = (props) => {
    return (
        <button className="NextButton" onClick={props.onclick}>Next ➜</button>
    );
}

export default NextButton;
