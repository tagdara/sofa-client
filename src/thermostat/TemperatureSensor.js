import React, { useContext, useState }from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CardBase from '../CardBase'
import SofaListItem from '../SofaListItem';

const useStyles = makeStyles(theme => {
    return {      
        listItem: {
            paddingTop: 0,
            paddingBottom:0,
            width: '100%',
        }
    }
})
 
export default function TemperatureSensor(props) { 
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const [showDetail, setShowDetail] = useState(false)
    
    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function switchToHistory() {
        selectPage('ThermostatHistory', { 'device':props.device, 'past':'7d'})
    }
    
    function toggleDetail() {
        setShowDetail(!showDetail)
    }
    return (
        
        <CardBase >
            <SofaListItem   avatar={props.deviceState.TemperatureSensor.temperature.value ? props.deviceState.TemperatureSensor.temperature.deepvalue : '--'} 
                            onClick={props.onClick ? props.onClick : toggleDetail} avatarClick={() => switchToHistory()} 
                            avatarState={ tempColor(props.deviceState.TemperatureSensor.temperature.deepvalue) }
                            primary={props.device.friendlyName} />
            { (showDetail && props.deviceState.hasOwnProperty('Light Level')) &&
                <ListItem className={classes.listItem}>
                    <ListItemText primary={'Light Level'} />
                    <Typography>{ props.deviceState['Light Level'].rangeValue.value }</Typography>
                </ListItem>
            }
            { (showDetail && props.deviceState.hasOwnProperty('Humidity')) &&
                <ListItem className={classes.listItem}>
                    <ListItemText primary={'Humidity'} />
                    <Typography>{ props.deviceState['Humidity'].rangeValue.value }</Typography>
                </ListItem>
            }
            { (showDetail && props.deviceState.hasOwnProperty('Wind Speed')) &&
                <ListItem className={classes.listItem}>
                    <ListItemText primary={'Wind Speed'} />
                    <Typography>{ props.deviceState['Wind Speed'].rangeValue.value }</Typography>
                </ListItem>
            }
            { (showDetail && props.deviceState.hasOwnProperty('UV Index')) &&
                <ListItem className={classes.listItem}>
                    <ListItemText primary={'UV Index'} />
                    <Typography>{ props.deviceState['UV Index'].rangeValue.value }</Typography>
                </ListItem>
            }

        </CardBase>
    );
}

