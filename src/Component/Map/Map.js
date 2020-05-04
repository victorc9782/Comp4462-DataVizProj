import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Covid19CaseLocation from '../../Config/Covid19CaseLocation.json';
import './Map.css';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 22.37,
      lng: 114.1
    },
    zoom: 10
  };
  toggleMarker(case_no){
    console.log("Marker "+case_no+" is pressed")
  }
  AnyReactComponent = ({ text, case_no }) => {
    return(
    <div className="marker"
      style={{ backgroundColor: '#000000', cursor: 'pointer'}}
      title={case_no}
      //onclick = {this.toggleMarker(case_no)}
    />
    )
  }
  render() {
    const AnyReactComponent = this.AnyReactComponent
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAd5lEr3jOvC2knuxINRDIznu6xWEVsfcw' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            
            Covid19CaseLocation.map((data)=>{
              return(
                <AnyReactComponent
                  lat={data.lat}
                  lng={data.lng}
                  text={data.case_no}
                  case_no={data.case_no}
                  //onClick={this.toggleMarker(data.case_no)}
                />
              )
            })
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;