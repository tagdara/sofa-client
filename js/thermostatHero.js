import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';

import ThermostatDialog from './thermostatDialog';
import Thermostat from './devices/thermostat';

const styles = theme => ({
        

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4 16",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
        padding: 0,
    }
    
});


class ThermostatHero extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: false,
        }
    }
    
    handleOverlay = () => {
        this.setState({showOverlay: true})
    }

    closeOverlay = () => {
        this.setState({showOverlay: false})
    }

    
    render() {
    
        const { classes } = this.props;
        
        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={this.handleOverlay}>
                        <List className={classes.thermostatList} >
                    { 
                    this.props.devices.map((device) =>
                        (device.friendlyName=='Main Thermostat' ?
                        <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } />
                        :
                        null
                    ))}
                        </List>
                    </CardContent>
                    <ThermostatDialog sendAlexaCommand={this.props.sendAlexaCommand} close={this.closeOverlay} open={this.state.showOverlay} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                </Card>
        );
    }
}

ThermostatHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThermostatHero);
