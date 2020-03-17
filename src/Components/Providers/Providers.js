import React from 'react';


import Iframe from 'react-iframe';

const Providers = () => {
    return (
        <Iframe 
            url={`${initialString}${allProviders}${this.state.myChartID}${defaultLocationVisitType}${endString}`}
            width="45%"
            height="800px"
            className="IframeLocationMyChart"
        />
    );
}

export default Providers;
