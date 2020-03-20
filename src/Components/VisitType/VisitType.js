import React from 'react';

import NextButton from '../commonUI/NextButton';
import { withRouter} from 'react-router';


import './VisitType.css';

const VisitType = (props) => {
  // const { match, location, history } = props;
    return (
      <div className="CheckBoxWrapper">
        <h1>Visit Type</h1>
        <div className="CheckBoxFlex">
                  
            <span>Have you been seen at any Perlman Clinic before?</span>
            <label className="VisitTypeCheckBox" onClick={(e) => props.changeinput(e)}>
              <input
                type="checkbox"
                defaultChecked={props.firsttime}
                name='firstTime'>
              </input>
              <span className="CustomCheckbox"></span>
              <div>{props.firsttime ? 'yes' : 'no' }</div>
            </label>
            
            <span>Is this for your Annual Physical Exam?</span>
            <label className="VisitTypeCheckBox" onClick={(e) => props.changeinput(e)}>
              <input
                type="checkbox"
                defaultChecked={props.annualphysical}
                name='annualPhysical'>
              </input>
              <span className="CustomCheckbox"></span>
              <div>{props.annualphysical ? 'yes' : 'no' }</div>
            </label>
        </div>
        <div className="VisitTypeButton">
          <NextButton name='Next' changecomponent={() => props.changecomponent('finalPage')} />
        </div>
      </div>
    );
}

export default withRouter(VisitType);