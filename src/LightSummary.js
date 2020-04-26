import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles, withTheme } from '@material-ui/styles';
import LightbulbOutlineIcon from './LightbulbOutline';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            padding: 16,
        },
        summaryButton: {
            width: 36,
            height: 36,
            padding: 8,
            marginRight: 8,
            color: theme.palette.primary.contrastText,
        },
        iconPad: {
            fontSize: 18,
            marginRight: 0,
        },
        count: {
            fontSize: 12,
        },
  
        disabled: {
            width: 96,
            color: "#444",
            borderColor: "#444",
            '&:hover': {
                backgroundColor: "#666",
                borderColor: "#444",
            }
        },
    }
});


export function LightSummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStateByFriendlyName, lightCount } = useContext(DataContext);
    const thermostat = deviceStateByFriendlyName('Main Thermostat')

    const lightsOn = lightCount('on');
    const classes = useStyles();

    function tempColor(temp) {
        if (temp>=74) { return 'hot' }
        if (temp<70) { return 'cool'}
        return 'mid';
    }

    return (            
            <div className={classes.iconRow}>
                <IconButton size={"small"} className={classes.summaryButton}
                        style={{'backgroundColor': props.theme.palette.avatar[lightsOn ? 'on' : 'off']}}
                        onClick={ () => applyLayoutCard('LightLayout') }>
                    <LightbulbOutlineIcon className={classes.iconPad} />
                    { lightsOn &&
                        <Typography className={classes.count}>
                            {lightsOn }
                        </Typography>
                    }
                </IconButton>
                { thermostat &&
                <IconButton size={"small"}  className={classes.summaryButton}
                    style={{'backgroundColor': props.theme.palette.avatar[tempColor(thermostat.TemperatureSensor.temperature.value)]}}
                    onClick={ () => applyLayoutCard('ThermostatLayout') }>
                    <Typography className={classes.count}>
                        {thermostat.TemperatureSensor.temperature.value ? thermostat.TemperatureSensor.temperature.deepvalue : '--'}&deg;
                    </Typography>
                </IconButton>
                }
            </div>
    );
}

export default withTheme(LightSummary)
