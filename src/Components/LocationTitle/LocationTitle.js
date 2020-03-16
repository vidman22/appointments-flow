import React from 'react';

import {useSpring, animated} from 'react-spring';

const LocationTitle = (props) => {
    const fadeprops= useSpring({opacity: props.toggle ? 1 : 0 })
    return (
        <animated.h1 style={fadeprops}>
            {props.title ? props.title : 'Choose a location'}
        </animated.h1>
    );
}

export default LocationTitle;
