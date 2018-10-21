import React, { Component } from "react";
import AreaList from '../arealist';
import ButtonHero from '../buttonHero';

class PageLights extends Component {
    
    componentDidMount() {  
        console.log('pdevs',this.props.devices)
    }
    
    render() {
        return (
            <div>
                <AreaList sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('LIGHT') } propertiesFromDevices={ this.props.propertiesFromDevices} deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('LIGHT')) }  />
                <ButtonHero sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('ALL') } propertiesFromDevices={ this.props.propertiesFromDevices} devicesByCategory={this.props.devicesByCategory} deviceProperties={ this.props.deviceProperties }  />
            </div>
        );
    }
}


export default PageLights;
