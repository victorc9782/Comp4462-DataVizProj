import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Add, LocalHospital, Healing, Close, FlightLand, People, PersonPin} from '@material-ui/icons';

import ClientMarker from './ClientMarker'

import CaseLocationJson from '../../Config/CaseLocation.json';
import CasesDetailsJson from '../../Config/CasesDetails.json';
import './Map.css';

const options = [
		'Client Status',
		'Case Classification',
		'Hide sensitive notification content',
		'Hide all notification content',
	]
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      CasesDetails: [],
      CasesLocationDetails: [],
	  filterType: "status",
	  anchorEl: null,
	  selectedIndex: 0
	  
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
	handleClickListItem = (event) => {
		this.setState({anchorEl: event.currentTarget})
	};
	handleMenuItemClick = (event, index) => {
		this.setState({anchorEl: null, selectedIndex: index})
	};

	handleClose = () => {
		this.setState({anchorEl: null})
	};
  toggleMarker(case_no){
    console.log("Marker "+case_no+" is pressed")
  }
  AnyReactComponent = ({ text, data, clientDetail }) => {
	const {filterType, selectedIndex} = this.state
    var markerColour='#ffffff';
    if (clientDetail!=null){

      //console.log(data.case_no+": "+ clientStatus+", "+markerColour)
      if (clientDetail.status!=null){
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
		  
			<ClientMarker generatedBy={selectedIndex} clientStatus = {clientDetail.status} clientClassification = {clientDetail.classification}/>
          </Tooltip>
        </div>
      )
      }
    }
    return null;
  }
  MapKey = ({selectedIndex}) => {
	if (selectedIndex == 0){
		return(
			<table>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: '#00ff00'}}>
					  <Healing style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					discharged
				  </td>
                </tr>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: '#ff7575'}}>
					  <LocalHospital style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					hospitalised
				  </td>
                </tr>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: '#ff0000'}}>
					  <LocalHospital style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					critical
				  </td>
                </tr>
                <tr>
                  <td>
						<IconButton style={{ padding: '1px',backgroundColor: '#545454'}}>
						  <Close style={{fontSize: 16}}/>
						</IconButton>
				  </td>
                  <td>
					deceased
				  </td>
                </tr>
			</table>
		)
	}
	else if (selectedIndex == 1){
		const confirmedColour = '#1c7800'
		const possiblyColour = '#545454'
		return(
			<table>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: confirmedColour}}>
					  <FlightLand style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					imported
				  </td>
                </tr>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: confirmedColour}}>
					  <People style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					Local Close Contact
				  </td>
                </tr>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: possiblyColour}}>
					  <PersonPin style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					Possibly Local
				  </td>
                </tr>
                <tr>
                  <td>
					<IconButton style={{ padding: '1px',backgroundColor: possiblyColour}}>
					  <People style={{fontSize: 16}}/>
					</IconButton>
				  </td>
                  <td>
					Possibly Local Close Contact
				  </td>
                </tr>
			</table>
		)
	}
	return null
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
	const {anchorEl, selectedIndex} = this.state
    return (
      // Important! Always set the container height explicitly
      <div >
		<div style={{ height: '85vh', width: '100%' }}>
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
		
		<Grid container style = {{flexGrow: 1}}spacing={2}>
			<Grid item xs={2} style={{width: 100}}>
				<List component="nav" aria-label="Device settings">
					<ListItem
					  button
					  aria-haspopup="true"
					  aria-controls="lock-menu"
					  aria-label="when device is locked"
					  onClick={this.handleClickListItem}
					>
						<ListItemText primary="Filter by:" secondary={options[selectedIndex]} />
					</ListItem>
				</List>
				<Menu
					id="lock-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
					PaperProps={{
					  style: {
						maxHeight: 100,
						width: '20ch',
					  },
					}}
				>
					{options.map((option, index) => (
					  <MenuItem
						key={option}
						selected={index === selectedIndex}
						onClick={(event) => this.handleMenuItemClick(event, index)}
					  >
						{option}
					  </MenuItem>
					))}
				</Menu>
			</Grid>
			<Grid item xs={2}>
			  <this.MapKey selectedIndex = {selectedIndex}/>
			</Grid>
		</Grid>
      </div>
    );
  }
}

export default Map;