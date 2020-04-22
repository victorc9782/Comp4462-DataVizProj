import React, { Component } from 'react';
import Map from '../Map/Map'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Main extends Component {
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
       <Map/>
      </div>
    );
  }
}

export default Main;