import React, { Component, createElement  } from 'react';
import AreaList from '../arealist';
import AreaListScenes from '../arealistscenes';
import LightList from '../lightlist';

class PageLights extends Component {

    render() {
        return (
            <div>
                <AreaListScenes />
                <AreaList deviceByName={this.props.deviceByName} devices={ this.props.devicesByCategory('LIGHT') } propertiesFromDevices={ this.props.propertiesFromDevices} deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('LIGHT')) } sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}


export default PageLights;
