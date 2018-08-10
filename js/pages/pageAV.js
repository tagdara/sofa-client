import React, { Component, createElement  } from 'react';
import PlayerList from '../playerlist';
import ReceiverList from '../receiverlist';
import TvList from '../tvlist';


class PageAv extends Component {

    render() {
        return (
            <div>
                <PlayerList devices={ this.props.devicesByCategory('SPEAKER') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('SPEAKER')) } sendMessage={this.props.sendMessage} />
                <ReceiverList devices={ this.props.devicesByCategory('RECEIVER') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('RECEIVER')) } sendMessage={this.props.sendMessage} />
                <TvList devices={ this.props.devicesByCategory('TV') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('TV')) } sendMessage={this.props.sendMessage} />
            </div>
        );
    }
}


export default PageAv;
