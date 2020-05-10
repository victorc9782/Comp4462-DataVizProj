import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import {Add, LocalHospital, Healing, Close} from '@material-ui/icons';
 function ClientMark({generatedBy, clientStatus}){
    if (generatedBy == "status"){
        
      if(clientStatus == "discharged"){
        return(
        <IconButton style={{ padding: '1px',backgroundColor: '#00ff00'}}>
          <Healing style={{fontSize: 14}}/>
        </IconButton>
        )
      }
      else if (clientStatus == "hospitalised" || clientStatus == "hospitalised_again" || clientStatus == "serious" || clientStatus == "cricital" ){
        return(
        <IconButton style={{ padding: '1px',backgroundColor: '#ff7575'}}>
          <LocalHospital style={{fontSize: 14}}/>
        </IconButton>
        )
      }
      else if (clientStatus == "deceased"){
        return (
            <IconButton style={{ padding: '1px',backgroundColor: '#545454'}}>
              <Close style={{fontSize: 14}}/>
            </IconButton>
        )
      }
      else if (clientStatus == "critical" || clientStatus == "serious"){
        return (
            <IconButton style={{ padding: '1px',backgroundColor: '#ff0000'}}>
              <LocalHospital style={{fontSize: 14}}/>
            </IconButton>
        )
      }
    }
    return(
      null
    )
  }
  export default ClientMark