import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {button} from 'bootstrap';
import Covid19CaseLocation from '../../Config/Covid19CaseLocation.json';
import Covid19CasesDetails from '../../Config/Covid19CasesDetails.json';
import './Map.css';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CasesDetails: [],
      CasesLocationDetails: [] 
    };
  }
  componentWillMount(){
    console.log("componentWillMount()")
    let CasesDetails = []
    Covid19CasesDetails.map((data)=>{
      CasesDetails.push(data)
    })
    let CasesLocationDetails = []
    Covid19CaseLocation.map((data)=>{
      CasesLocationDetails.push(data)
    })
    this.setState({CasesDetails: CasesDetails, CasesLocationDetails: CasesLocationDetails})
  }
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
  AnyReactComponent = ({ text, data, clientStatus }) => {
    var markerColour='#ffffff';
    if(clientStatus == "discharged"){
      markerColour = "#00ff00"
    }
    else if (clientStatus == "hospitalised"){
      markerColour = "#ff0000"
    }
    else if (clientStatus == "deceased"){
      markerColour = "#545454"
    }
    //console.log(data.case_no+": "+ clientStatus+", "+markerColour)
    return(
      /*
    <button type="button" class="btn btn-primary">Primary</button>
    */
   
    <div className="marker"
      style={{ backgroundColor: markerColour, cursor: 'pointer'}}
      title={data.case_no+"\n"+"Status: "+clientStatus}
    //onclick = {this.toggleMarker(case_no)}
    />
    )
  }
  getClientStatus = (case_no)=>{
    var status = ""
    this.state.CasesDetails.map(v=> {
      if (v.case_no == case_no){
        status =  v.status
      }
    }
    )
    return status
    //console.log(caseDetail);
    //return caseDetail.status
  }
  List = () =>{
    const AnyReactComponent = this.AnyReactComponent
    
    console.log("Client List: ")
    var count = 0;
    var DotList = this.state.CasesLocationDetails.map((data)=>{
      count++;
      if ((data.action_en=="Residence" || data.action_en=="Accommodation") && data.case_no!=''){
        console.log(data.case_no+": "+data.lat+", "+data.lng)
        let ClientStatus = this.getClientStatus(data.case_no)
        console.log("ClientStatus: "+ClientStatus)
      return(
        <AnyReactComponent
          lat={data.lat}
          lng={data.lng}
          text={data.case_no}
          case_no={data.case_no}
          data={data}
          clientStatus={ClientStatus}
          //onClick={this.toggleMarker(data.case_no)}
        />
      )
      }
    })
    console.log("count: "+count)
    return DotList
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
            this.List()
          }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;