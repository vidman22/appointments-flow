import React, {useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring'
import NextButton from '../commonUI/NextButton';
import { withRouter} from 'react-router';

import './VisitType.css';

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: 'lightpink' }}><AnnualVisit /></animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightblue' }}><FirstTime /></animated.div>,
]

const VisitType = (props) => {

  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 2), [])
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })

    return (
      <div className="CheckBoxWrapper">
        <h1>Visit Type</h1>
        <div className="CheckBoxFlex">
          <FirstTime firsttime={props.firsttime} changeinput={props.changeinput}/>
          <AnnualVisit annualphysical={props.annualphysical} changeinput={props.changeinput} />
          
        </div>
        <div className="VisitTypeButton">
          <NextButton name='Next' changecomponent={() => props.changecomponent('finalPage')} />
        </div>
      </div>
    );
}

export default withRouter(VisitType);


const FirstTime = (props) => {
  return (
    <div className="QuestionWrapper">
    <span>Have you been seen at any Perlman Clinic before?</span>
    <label className="VisitTypeRadioButton" >
      <input
        onChange={(e) => props.changeinput(e, 'firstTime')}
        type="radio"
        checked={props.firsttime === "returnee"}
        name='returnee'>
      </input>
      <span className="CustomVisitRadio"></span>
      <div>Yes, I have</div>
    </label>
    <label className="VisitTypeRadioButton" >
      <input
        onChange={(e) => props.changeinput(e, 'firstTime')}
        type="radio"
        checked={props.firsttime === "firstTime"}
        name='firstTime'>
      </input>
      <span className="CustomVisitRadio"></span>
      <div>No, this is my first time</div>
    </label>
  </div>
  );
}

const AnnualVisit = (props) => {
  return (
      <div className="QuestionMarker">
        <span>What type of visit do you need?</span>
        <label className="VisitTypeRadioButton" >
          <input
            onChange={(e) => props.changeinput(e, 'annualPhysical')}
            type="radio"
            checked={props.annualphysical === 'officeVisit'}
            name='officeVisit'>
          </input>
          <span className="CustomVisitRadio"></span>
          <div>Office Visit</div>
        </label>
        <label className="VisitTypeRadioButton" >
          <input
            onChange={(e) => props.changeinput(e, 'annualPhysical')}
            type="radio"
            checked={props.annualphysical === 'annualPhysical'}
            name='annualPhysical'>
          </input>
          <span className="CustomVisitRadio"></span>
          <div>Annual Physical Exam</div>
        </label>

      </div>
  );
}
