import React from 'react';

import './FinalPage.css';

const FinalPage = () => {
    return (
         <Iframe 
            url={props.url}
            height="900px"
            width="100%"
            frameBorder="0"
            className="IframeLocationMyChart"
        />
    );
}

export default FinalPage;
