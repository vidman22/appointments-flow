import React, {Component} from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Locations from '../Lists/Locations';
import fancyMapStyles from '../MapStyle.json';

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

export class Map extends Component {
    constructor(props){
        super(props);
          this.state = {
            myChartID: '',
            name: '',
            toggle: false,
          }
        }

    markerClicked =( name, link) => {
        this.setState({
          name,
          myChartID: link,
          toggle: true,
        })
    }

    render() {
        return (
            <div>
                <MyMapComponent markerclicked={this.markerClicked} isMarkerShown/>
            </div>
        );
    }
}

