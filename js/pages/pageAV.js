import React, { Component } from "react";
import PlayerList from '../playerlist';
import ReceiverList from '../receiverlist';
import TvList from '../tvlist';


class PageAv extends Component {

    render() {
        return (
            <div>
                <PlayerList sendAlexaCommand={this.props.sendAlexaCommand} defaultPlayer={'Office'} devices={ this.props.devicesByCategory('SPEAKER') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('SPEAKER')) } />
                <ReceiverList sendAlexaCommand={this.props.sendAlexaCommand} devices={ this.props.devicesByCategory('RECEIVER') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('RECEIVER')) } />
                <TvList sendAlexaCommand={this.props.sendAlexaCommand} devices={ this.props.devicesByCategory('TV') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('TV')) } />
            </div>
        );
    }
}


export default PageAv;
