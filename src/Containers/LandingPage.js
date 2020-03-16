import React, {Component} from 'react';

import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import LocationTitle from '../Components/LocationTitle/LocationTitle';


// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import fancyMapStyles from '../MapStyle.json';

import Iframe from 'react-iframe';

import Locations from '../Lists/Locations';

import './LandingPage.css';

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmGDb8cTZ1DXx9l6UmKjcHuOEmNUU7pGA&",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="MapContainerElement"  />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={10.4}
    defaultCenter={{ lat: 32.849264, lng: -117.210677 }}
    defaultOptions={{ styles: fancyMapStyles, gestureHandling: 'none', zoomControl: false }}
    
   
  >  
    {Locations.map( ( loc ) => {
      return <Marker onClick={() => props.markerclicked(loc.name, loc.myChartID)} key={loc.lat} position={{lat: loc.lat, lng: loc.lng }} />
    })}
    
  </GoogleMap>
)



export class LandingPage extends Component {
  constructor(props){
    super(props);
      this.state = {
        myChartID: '',
        name: '',
        toggle: false,
        annualPhysical: false,
        firstTime: false,
      }
    }

    markerClicked =( name, link) => {

      this.setState({
        name,
        myChartID: link,
        toggle: true,
      })
    }

    changeInput = (event)=> {
      const target = event.target;
      // const value = target.name;
      const name = target.name;
      console.log("name", name);
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

    render() {
      const initialString	= "https://mychart.perlmanclinic.com/mpc/SignupAndSchedule/EmbeddedSchedule?id="
      const allProviders	= "270075,39702,12290,06405,60830,40112,65521,82085,84690,269588,84615,269811,270084,270085,270104,267633,257289,16808,270089,270108,98016,269350,05073,270103,08899,34455,35697,97632,270096,270097,51404,14436,257284,263086,263890,270654,270607,271056,272253,273037,267386,272234,270059,273570,82466,263319,40414,263353,278020,25406,277986,278112,278907,98164,08670,262694,279880,279810,280127&dept="
      const allLocations =	"&dept=54206023,54208023,54204023,54207023,54209023,54202023,54201023,54205023,54203023,54219023,54220023"
      const defaultLocationVisitType =	"&vt=534412"
      const dynamicVisitType = `&vt=${this.dynamicVisitType()}`
      const endString = "&view=plain&payor=1001,1003,1012,1013,1014,1017,1020,1023,1024,1029,1032,1039,1042,1050,1058,1072,1086,1088,1091,1093,-1,-2,-3"
        // const url = initialString + allProviders + '&dept=' + this.state.myChartID + visitType + endString;
        // https://mychart.perlmanclinic.com/mpc/SignupAndSchedule/EmbeddedSchedule?id=270075,39702,12290,06405,60830,40112,65521,82085,84690,269588,84615,269811,270084,270085,270104,267633,257289,16808,270089,270108,98016,269350,05073,270103,08899,34455,35697,97632,270096,270097,51404,14436,257284,263086,263890,270654,270607,271056,272253,273037,267386,272234,270059,273570,82466,263319,40414,263353,278020,25406,277986,278112,278907,98164,08670,262694,279880,279810,280127&dept=54219023&vt=534412&view=plain&payor=1001,1003,1012,1013,1014,1017,1020,1023,1024,1029,1032,1039,1042,1050,1058,1072,1086,1088,1091,1093,-1,-2,-3
        return (
            <div className="LocationsLandingWrapper">
                <LocationTitle title={this.state.name} toggle={this.state.toggle}/>
                <div className="LocationsFlex">
                    <Iframe 
                      url={`${initialString}${allProviders}${this.state.myChartID}${defaultLocationVisitType}${endString}`}
                      width="45%"
                      height="800px"
                      className="IframeLocationMyChart"
                    />
                    <MyMapComponent markerclicked={this.markerClicked} isMarkerShown/>
                    
                </div>
                <div className="CheckBoxFlex">
                  <div>
                    <span>Have you been seen at any Perlman Clinic before?</span>
                    <label onClick={(e) => this.changeInput(e)}>
                      <input
                        // onChange={this.changeInput}
                        type="checkbox"
                        defaultChecked={this.state.firstTime}
                        name='firstTime'>
                      </input>
                      {this.state.firstTime ? 'yes' : 'no' }
                    </label>
                  </div>
                  <div>
                    <span>Is this for your Annual Physical Exam?</span>
                    <label onClick={(e) => this.changeInput(e)}>
                      <input
                        // onChange={this.changeInput}
                        type="checkbox"
                        defaultChecked={this.state.annualPhysical}
                        name='annualPhysical'>
                      </input>
                      {this.state.annualPhysical ? 'yes' : 'no' }
                    </label>
                  </div>
                </div>
                <div>
                  {this.dynamicVisitType()}
                </div>
            </div>
        );
    }
}

export default LandingPage;
