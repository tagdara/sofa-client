import React, { Component } from "react";

import ButtonZone from './devices/buttonzone';
import ButtonGrid from './devices/buttonGrid';
import CameraSelect from './cameraselect';
import ZoneList from './zonelist';
import ThermostatHero from './thermostatHero';
import { withData } from './dataContext';

class PageSecurity extends Component {

    render() {
        return (
            <div>
                <ZoneList filter='open' Category='ZONE' />
                <CameraSelect />
                <ButtonGrid>
                    <ButtonZone icon={'dialpad'} name={ 'Garage Door' } device={ this.props.deviceByName('Garage Door Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door Btn')) } zoneDevice={ this.props.deviceByName('Garage Door') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
                    <ButtonZone icon={'lock_open'} name={ 'Front Gate' } device={ this.props.deviceByName('Front Gate Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate Btn')) } zoneDevice={ this.props.deviceByName('Front Gate') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
                </ButtonGrid>
                <ThermostatHero Category="THERMOSTAT" />
            </div>
        );
    }
}

export default withData(PageSecurity);
