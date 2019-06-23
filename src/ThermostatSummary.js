import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';
import GridItem from './GridItem'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => {
    return {        
        cool: {
            width: 96,
            color: "#00796B",
            borderColor: "#00796B",
            '&:hover': {
                backgroundColor: "#B2DFDB",
                borderColor: "#00796B",
            }
        },
        mid: {
            width: 96,
            color: "#558B2F",
            borderColor: "#558B2F",
            '&:hover': {
                backgroundColor: "#DCEDC8",
                borderColor: "#558B2F",
            }
                
        },
        hot: {
            width: 96,
            color: "#E65100",
            borderColor: "#E65100",
            '&:hover': {
                backgroundColor: "#FFE0B2",
                borderColor: "#E65100",
            }
        }
    }
});

function ThermostatSummary(props) { 
    
    const device = props.deviceByName('Main Thermostat')
    const classes = useStyles();
    
    function tempColor(temp) {
        if (temp>=74) { return classes.hot }
        if (temp<70) { return classes.cool }
        return classes.mid;
    }
    
    return (
            <GridItem wide={false} nopaper={true}>
                { device && props.deviceProperties[device.endpointId].hasOwnProperty('temperature') &&
                <Button variant="outlined" color="primary" className={tempColor(props.deviceProperties[device.endpointId].temperature.value)} onClick={ () => props.applyLayoutCard('ThermostatLayout') }>
                    {props.deviceProperties[device.endpointId].temperature.value}&deg;
                </Button>
                }
            </GridItem>
    );
}

export default withData(withLayout(ThermostatSummary));

