import React, {Component} from 'react';

import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import LocationTitle from '../Components/LocationTitle/LocationTitle';


// import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

import fancyMapStyles from '../MapStyle.json';

import Iframe from 'react-iframe';

import Locations from '../Lists/Locations';

import './LandingPage.css';

console.log("locations", Locations);

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
      return <Marker onClick={() => props.markerclicked(loc.name, loc.myChart)} key={loc.lat} position={{lat: loc.lat, lng: loc.lng }} />
    })}
    
  </GoogleMap>
)



export class LandingPage extends Component {
  constructor(props){
    super(props);
      this.state = {
        link: '',
        name: '',
        toggle: false,
      }
    }

    markerClicked =( name, link) => {
      console.log("clicked", name, link);
      this.setState({
        name,
        link,
        toggle: true,
      })
    }
    render() {
        return (
            <div className="LocationsLandingWrapper">
                <LocationTitle title={this.state.name} toggle={this.state.toggle}/>
                <div className="LocationsFlex">
                    <Iframe 
                      url={this.state.link}
                      width="45%"
                      height="800px"
                      className="IframeLocationMyChart"
                    />
                    <MyMapComponent markerclicked={this.markerClicked} isMarkerShown/>
                </div>
            </div>
        );
    }
}

export default LandingPage;
