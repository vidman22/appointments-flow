import React from 'react';


import Iframe from 'react-iframe';

const Providers = (props) => {
    return (
        <Iframe 
            url={props.url}
            // url={`${initialString}${allProviders}${this.state.myChartID}${defaultLocationVisitType}${endString}`}
            height="900px"
            width="100%"
            frameBorder="0"
            className="IframeLocationMyChart"
        />
    );
}

export default Providers;
