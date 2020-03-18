import React from 'react';
import { Link } from 'react-router-dom';
import './common.css'

const NextButton = (props) => {
    return (
        <button className="NextButton" onClick={props.changecomponent} >{props.name}</button>
    );
}

export default NextButton;