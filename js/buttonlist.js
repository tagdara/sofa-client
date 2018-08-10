
import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SmartButton from './devices/smartbutton';

const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});



class ButtonList extends React.Component {

    render() {
    
        const { classes } = this.props;
        
        return (
            <div className={classes.list}>
                { 
                this.props.devices.map((device) =>
                    this.props.filter==undefined || this.props.deviceProperties[device.friendlyName].position==this.props.filter ?
                    <SmartButton key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                    : null
                )}
            </div> 
        );
    }
}

ButtonList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonList);
