import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

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
        },
        disabled: {
            width: 96,
            color: "#444",
            borderColor: "#444",
            '&:hover': {
                backgroundColor: "#666",
                borderColor: "#444",
            }
        }
    }
});

export default function ThermostatSummary(props) { 
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceByFriendlyName } = useContext(DataContext);
    const device = deviceByFriendlyName('Main Thermostat')
    const classes = useStyles();
    
    function tempColor(temp) {
        if (temp>=74) { return classes.hot }
        if (temp<70) { return classes.cool }
        return classes.mid;
    }
    
    return ( device ?
            <GridItem wide={false} nopaper={true}>
                <Button variant="outlined" color="primary" className={device.TemperatureSensor.temperature.value ? tempColor(device.TemperatureSensor.temperature.deepvalue) : classes.disabled } onClick={ () => applyLayoutCard('ThermostatLayout') }>
                    {device.TemperatureSensor.temperature.value ? device.TemperatureSensor.temperature.deepvalue : '--'}&deg;
                </Button>
            </GridItem>
            : null
    );
}

