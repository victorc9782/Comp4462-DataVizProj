import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import ClientMarker from './ClientMarker'

import CaseLocationJson from '../../Config/CaseLocation.json';
import CasesDetailsJson from '../../Config/CasesDetails.json';
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
    CasesDetailsJson.map((data)=>{
      CasesDetails.push(data)
    })
    let CasesLocationDetails = []
    CaseLocationJson.map((data)=>{
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
  AnyReactComponent = ({ text, data, clientDetail }) => {
    var markerColour='#ffffff';
    if (clientDetail!=null){
      var clientStatus = clientDetail.status

      if(clientStatus == "discharged"){
        markerColour = "#00ff00"
      }
      else if (clientStatus == "hospitalised" || clientStatus == "hospitalised_again" || clientStatus == "serious" || clientStatus == "cricital" ){
        markerColour = "#ff7575"
      }
      else if (clientStatus == "deceased"){
        markerColour = "#545454"
      }
      else if (clientStatus == "critical"){
        markerColour = "#ff0000"
      }
      //console.log(data.case_no+": "+ clientStatus+", "+markerColour)
      if (clientStatus!=null){
        var titleText = data.case_no+"</br>"
        titleText+="Confirmation Date: "+clientDetail.confirmation_date+"\n"
        titleText+="Gender: "+clientDetail.gender+"\n"
        titleText+="Age: "+clientDetail.age+"\n"
        titleText+="Hospital: "+clientDetail.hospital_en+"\n"
        titleText+="Status: "+clientDetail.status_en+"\n"
        titleText+="Client Type: "+clientDetail.type_en+"\n"
        titleText+="Classification: "+clientDetail.classification_en+"\n"
      return(
        <div>
          <Tooltip 
            title={
            <Fragment>
              <Typography color="inherit">{data.case_no}</Typography>
                <tr>
                  <td>Confirmation Date:</td>
                  <td>{clientDetail.confirmation_date}</td>
                </tr>
                <tr>
                  <td>Gender: </td>
                  <td>{clientDetail.gender}</td>
                </tr>
                <tr>
                  <td>Age: </td>
                  <td>{clientDetail.age}</td>
                </tr>
                <tr>
                  <td>Hospital: </td>
                  <td>{clientDetail.hospital_en}</td>
                </tr>
                <tr>
                  <td>Status: </td>
                  <td>{clientDetail.status_en}</td>
                </tr>
                <tr>
                  <td>Client Type: </td>
                  <td>{clientDetail.type_en}</td>
                </tr>
                <tr>
                  <td>Classification: </td>
                  <td>{clientDetail.classification_en}</td>
                </tr>
            </Fragment>
            } 
            style={{
              backgroundColor: '#f5f5f9',
              color: 'rgba(0, 0, 0, 0.87)',
              maxWidth: 220,
              fontSize: 12,
              border: '1px solid #dadde9',
            }}
          >
            <ClientMarker generatedBy="status" clientStatus = {clientDetail.status}/>
          </Tooltip>
        </div>
      )
      }
    }
    return null;
  }
  getClientDetail = (case_no)=>{
    var detail = null
    this.state.CasesDetails.map(v=> {
      if (v.case_no == case_no){
        detail =  v
      }
    }
    )
    return detail
    //console.log(caseDetail);
    //return caseDetail.status
  }
  List = () =>{
    const AnyReactComponent = this.AnyReactComponent
    
    console.log("Client List: ")
    var count = 0;
    var DotList = this.state.CasesLocationDetails.map((data)=>{
      count++;
      if ((data.action_en=="Residence" || data.action_en=="Accommodation") && data.case_no!=null){
        console.log(data.case_no+": "+data.lat+", "+data.lng)
        let clientDetail = this.getClientDetail(data.case_no)
      return(
        <AnyReactComponent
          lat={data.lat}
          lng={data.lng}
          text={data.case_no}
          case_no={data.case_no}
          data={data}
          clientDetail={clientDetail}
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