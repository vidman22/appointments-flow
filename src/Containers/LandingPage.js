import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import VisitType from '../Components/VisitType/VisitType';
import Location from './Location/Location';
// import LocationTitle from '../Components/LocationTitle/LocationTitle';
import ProgressBar from '../Components/ProgressBar/ProgressBar';
import Providers from '../Components/Providers/Providers';

import './LandingPage.css';

export class LandingPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props){
    super(props);
      this.state = {
        annualPhysical: false,
        firstTime: false,
        renderedComponent: 'visitType',
        myChartLocationID: '',
      }
    }

    componentDidMount(){
      const { match, location } = this.props;
      const locationID = location.pathname.indexOf('locationID') > -1 ? match.params.id : null;
      const pcpID = location.pathname.indexOf('pcpID') > -1 ? match.params.id : null;
      
      this.setState({
        locationID,
        pcpID
      });
     
    }

    changeInput = (event)=> {
      const target = event.target;
      const name = target.name;
    
      this.setState( prevState => {
        return {[name]: !prevState[name]}
      });  
    }

    dynamicVisitType() {
      //annual exam
      if (this.state.firstTime && this.state.annualPhysical){
        return '534055'
      } 
      //office visit
      if (this.state.firstTime && !this.state.annualPhysical){
        return '534041'
      }
      // new annual
      if (!this.state.firstTime && this.state.annualPhysical){
        return '534047'
      }
      // new patient
      if (!this.state.firstTime && !this.state.annualPhysical){
        return '534029'
      }
    }

    changeComponent = (type) => {
      this.setState({
        renderedComponent: type
      })
    }

    sendMyChartLink = (link) => {
      this.setState({
        myChartLocationID: link,
      })
    }



    render() {
      
      
      const {renderedComponent, firstTime, annualPhysical, pcpID, locationID} = this.state;
      const initialString	= "https://mychart.perlmanclinic.com/mpc/SignupAndSchedule/EmbeddedSchedule?id="
      const allProviders	= "270075,39702,12290,06405,60830,40112,65521,82085,84690,269588,84615,269811,270084,270085,270104,267633,257289,16808,270089,270108,98016,269350,05073,270103,08899,34455,35697,97632,270096,270097,51404,14436,257284,263086,263890,270654,270607,271056,272253,273037,267386,272234,270059,273570,82466,263319,40414,263353,278020,25406,277986,278112,278907,98164,08670,262694,279880,279810,280127&dept="
      const allLocations =	"&dept=54206023,54208023,54204023,54207023,54209023,54202023,54201023,54205023,54203023,54219023,54220023"
      const defaultVisitType =	"&vt=534412"
      const dynamicVisitType = `&vt=${this.dynamicVisitType()}`
      const endString = "&view=plain&payor=1001,1003,1012,1013,1014,1017,1020,1023,1024,1029,1032,1039,1042,1050,1058,1072,1086,1088,1091,1093,-1,-2,-3"
      const url = initialString + allProviders + this.state.myChartLocationID + defaultVisitType + endString;
      // https://mychart.perlmanclinic.com/mpc/SignupAndSchedule/EmbeddedSchedule?id=270075,39702,12290,06405,60830,40112,65521,82085,84690,269588,84615,269811,270084,270085,270104,267633,257289,16808,270089,270108,98016,269350,05073,270103,08899,34455,35697,97632,270096,270097,51404,14436,257284,263086,263890,270654,270607,271056,272253,273037,267386,272234,270059,273570,82466,263319,40414,263353,278020,25406,277986,278112,278907,98164,08670,262694,279880,279810,280127&dept=54219023&vt=534412&view=plain&payor=1001,1003,1012,1013,1014,1017,1020,1023,1024,1029,1032,1039,1042,1050,1058,1072,1086,1088,1091,1093,-1,-2,-3
        return (
            <div className="AppointmentsLandingWrapper">
                <ProgressBar renderedcomponent={renderedComponent} />
                {/* <Route path={`${location.pathname}/location/:id`} render={() => <Location sendmychartlink={this.sendMyChartLink} /> } /> */}
                {renderedComponent === 'location' && <Location locationid={locationID} pcpid={pcpID} changecomponent={this.changeComponent} sendmychartlink={this.sendMyChartLink}  />}
                
                {renderedComponent === 'provider' && <Providers alllocations={allLocations} pcpid={pcpID} changecomponent={this.changeComponent} url={url} />}
                
                {renderedComponent === 'visitType' && <VisitType changecomponent={this.changeComponent} changeinput={this.changeInput} firsttime={firstTime} annualphysical={annualPhysical} dynamicURL={this.dynamicVisitType()}/>}
                  
            </div>
        );
    }
}

export default withRouter(LandingPage);