import React from 'react';

import './ProgressBar.css';

const ProgressBar = (props) => {
    return (
        <div className="ProgressBarWrapper">
            <ul className="ProgressBar">
                <li className={props.renderedcomponent === 'visitType' ? 'active' : ''}>Visit Type</li>
                <li className={props.renderedcomponent === 'location' ? 'active' : ''}>Location</li>
                <li className={props.renderedcomponent === 'provider' ? 'active' : ''}>Provider</li>
            </ul>
        </div>
        
    );
}

export default ProgressBar;
