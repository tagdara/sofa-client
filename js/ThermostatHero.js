import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withData } from './DataContext/withData';

import List from '@material-ui/core/List';

import SofaCard from './sofaCard';
import Thermostat from './thermostat/thermostat';
import ThermostatDialog from './thermostat/thermostatDialog';


const styles = theme => ({
        
    list: {
        padding: 0,
        width: '100%',
    },
    
});

class ThermostatHero extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }
    
    openDialog = () => {
        this.setState({open: true})
    }

    closeDialog = () => {
        this.setState({open: false})
    }

    render() {
    
        const { classes, devices, deviceProperties } = this.props;
        const { open } = this.state;   
        
        return (
            <SofaCard>
                <List className={classes.list} onClick={ (e) => this.openDialog(e)}>
                    { devices.map((device) => (device.friendlyName=='Main Thermostat' ?
                        <Thermostat key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ deviceProperties[device.friendlyName] } />
                    : null ))}
                </List>
                <ThermostatDialog sendAlexaCommand={this.props.sendAlexaCommand} close={this.closeDialog} open={open} devices={devices} deviceProperties={ deviceProperties } />
            </SofaCard>
        );
    }
}

ThermostatHero.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(ThermostatHero));
