import React from 'react';

import NextButton from '../commonUI/NextButton';

import './VisitType.css';

const VisitType = (props) => {
    return (
      <div className="CheckBoxWrapper">
        <div className="CheckBoxFlex">
                  
            <span>Have you been seen at any Perlman Clinic before?</span>
            <label className="VisitTypeCheckBox" onClick={(e) => props.changeinput(e)}>
              <input
                type="checkbox"
                defaultChecked={props.firsttime}
                name='firstTime'>
              </input>
              <span className="CustomCheckbox"></span>
            </label>
              {props.firsttime ? 'yes' : 'no' }
            
            <span>Is this for your Annual Physical Exam?</span>
            <label className="VisitTypeCheckBox" onClick={(e) => props.changeinput(e)}>
              <input
                type="checkbox"
                defaultChecked={props.annualphysical}
                name='annualPhysical'>
              </input>
              <span className="CustomCheckbox"></span>
            </label>
              {props.annualphysical ? 'yes' : 'no' }
        </div>
        <NextButton onclick={props.next('location')} />
      </div>
    );
}

export default VisitType;
