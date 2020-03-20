import React from 'react';

import BackButton from '../commonUI/BackButton';

import Iframe from 'react-iframe';

import './FinalPage.css';

const FinalPage = (props) => {
    const {pcp} = props;
    return (
        <div className="FinalPage">
            <BackButton content="Back" changecomponent={() => props.changecomponent('visitType')}/>
        <h1>{props.location && props.location.name } {pcp && pcp.firstName + ' ' + pcp.lastName + ', ' + pcp.title }  Schedule</h1>
            <Iframe 
               url={props.url}
               height="900px"
               width="100%"
               frameBorder="0"
               className="IframeLocationMyChart"
           />
        </div>
    );
}

export default FinalPage;
