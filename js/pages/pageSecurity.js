import React, { Component } from "react";

import ButtonZone from '../devices/buttonzone';
import ButtonGrid from '../devices/buttongrid';
import CameraSelect from '../cameraselect';
import ZoneList from '../zonelist';
import ThermostatHero from '../thermostatHero';

class PageSecurity extends Component {

    render() {
        return (
            <div>
                <ZoneList key='zonelist' filter='open' Category='Zone' devices={ this.props.devicesByCategory('ZONE') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('ZONE')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
                <CameraSelect sendAlexaCommand={this.props.sendAlexaCommand}  />
                <ButtonGrid>
                    <ButtonZone key={ 'gbut1' } icon={'dialpad'} name={ 'Garage Door' } device={ this.props.deviceByName('Garage Door Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door Btn')) } zoneDevice={ this.props.deviceByName('Garage Door') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
                    <ButtonZone key={ 'fgbut1' } icon={'lock_open'} name={ 'Front Gate' } device={ this.props.deviceByName('Front Gate Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate Btn')) } zoneDevice={ this.props.deviceByName('Front Gate') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
                </ButtonGrid>
                <ThermostatHero deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('THERMOSTAT') } propertiesFromDevices={ this.props.propertiesFromDevices} deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('THERMOSTAT')) } sendAlexaCommand={this.props.sendAlexaCommand}  />
            </div>
        );
    }
}


export default PageSecurity;
