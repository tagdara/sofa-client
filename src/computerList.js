import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Computer from './devices/computer';



const styles = theme => ({
        
    thermostatList: {
        width: "100%",
    },

});


class ComputerList extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
            <List className={classes.thermostatList} >
                { 
                    this.props.devices.map((device) =>
                        <Computer sendAlexaCommand={this.props.sendAlexaCommand} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] }  />
                )}
            </List>

        )
    }

}

ComputerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComputerList);
