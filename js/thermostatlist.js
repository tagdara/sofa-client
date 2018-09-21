import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Zone from './devices/zone';
import Thermostat from './devices/thermostat';
import ThermostatSettable from './devices/thermostatSettable';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16 24 16 24",
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    thermostatList: {
        width: "100%",
    }
    

});


class ThermostatList extends React.Component {

    render() {
    
        const { classes } = this.props;
        
        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <List className={classes.thermostatList} >
                    { 
                    this.props.devices.map((device) =>
                        (device.friendlyName=='Main Thermostat' ?
                        <ThermostatSettable key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                        :
                        null
                    ))}
                        <Divider />

                    { 
                    this.props.devices.map((device) =>
                        (device.friendlyName=='Main Thermostat' ?
                        null :
                        <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />

                    ))}
                        </List>
                    </CardContent>
                </Card>
        );
    }
}

ThermostatList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThermostatList);
