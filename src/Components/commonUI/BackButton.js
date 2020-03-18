import React from 'react';

const BackButton = (props) => {
    return (
        <button className="BackButton" changecomponent={props.changecomponent}>Back</button>
    );
}

export default BackButton;
