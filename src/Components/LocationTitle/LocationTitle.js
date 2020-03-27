import React from 'react';

// import {useSpring, animated} from 'react-spring';

const LocationTitle = (props) => {
    return (
       
            <h1>{props.title ? props.title : 'Choose a location'}</h1>
    );
}

export default LocationTitle;