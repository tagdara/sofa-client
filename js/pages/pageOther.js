import React, { Component, createElement  } from 'react';
import VirtualList from '../virtuallist';
import ButtonList from '../buttonlist';

class PageOther extends Component {

    render() {
        return (
            <div>
                <VirtualList sender={ this.props.sendMessage } />
                <ButtonList devices={ this.props.devicesByCategory('BUTTON') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('BUTTON')) } sender={this.props.sendMessage} />
            </div>
        );
    }
}


export default PageOther;
