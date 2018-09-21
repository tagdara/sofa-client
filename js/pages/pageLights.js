import React, { Component } from "react";
import AreaList from '../arealist';
import ButtonHero from '../buttonHero';

class PageLights extends Component {

    render() {
        return (
            <div>
                <AreaList sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('LIGHT') } propertiesFromDevices={ this.props.propertiesFromDevices} deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('LIGHT')) } sendMessage={this.props.sendMessage} />
                <ButtonHero sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('BUTTON') } propertiesFromDevices={ this.props.propertiesFromDevices} deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('BUTTON')) } sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}


export default PageLights;
