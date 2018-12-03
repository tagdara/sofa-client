import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Device from './devices/device';

const styles = theme => ({
        
    list: {
        width: "100%",
    },

});


class DeviceList extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
            <List className={classes.list} >
                { 
                    this.props.devices.map((device) =>
                        <Device sendAlexaCommand={this.props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] }  />
                )}
            </List>

        )
    }

}

DeviceList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceList);
