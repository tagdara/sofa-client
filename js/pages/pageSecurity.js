import React, { Component, createElement  } from 'react';
import ButtonZone from '../devices/buttonzone';
import CameraSelect from '../cameraselect';
import ZoneList from '../zonelist';

class PageSecurity extends Component {

    render() {
        return (
            <div>
                <ZoneList key='zonelist' filter='open' Category='Zone' devices={ this.props.devicesByCategory('ZONE') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('ZONE')) } sender={this.props.sendMessage} />
                <CameraSelect sender={this.props.sendMessage} />
                <ButtonZone key={ 'gbut1' } icon={'dialpad'} name={ 'Garage Door' } device={ this.props.deviceByName('Garage Door Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door Btn')) } zoneDevice={ this.props.deviceByName('Garage Door') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Garage Door')) } sendMessage={this.props.sendMessage} />
                <ButtonZone key={ 'fgbut1' } icon={'lock_open'} name={ 'Front Gate' } device={ this.props.deviceByName('Front Gate Btn') } deviceProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate Btn')) } zoneDevice={ this.props.deviceByName('Front Gate') } zoneProperties={ this.props.propertiesFromDevices(this.props.deviceByName('Front Gate')) } sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}


export default PageSecurity;
