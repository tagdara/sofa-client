import React, { useContext, useState }from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import CardBase from 'components/CardBase'
import SofaListItem from 'components/SofaListItem';


const useStyles = makeStyles(theme => {
    return {      
        listItem: {
            paddingTop: 0,
            paddingBottom:0,
            width: '100%',
        },
        detail: {
            width: "100%",
            paddingTop: -8,
        },
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
        
        <CardBase hasCollapse={true}>
            <SofaListItem   avatar={props.deviceState.TemperatureSensor.temperature.value ? props.deviceState.TemperatureSensor.temperature.deepvalue : '--'} 
                            labelClick={props.onClick ? props.onClick : toggleDetail} avatarClick={() => switchToHistory()} 
                            avatarState={ tempColor(props.deviceState.TemperatureSensor.temperature.deepvalue) }
                            primary={props.device.friendlyName} />
            <Collapse in={showDetail} className={classes.detail}>
                { props.deviceState.hasOwnProperty('Light Level') &&
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={'Light Level'} />
                        <Typography>{ props.deviceState['Light Level'].rangeValue.value }</Typography>
                    </ListItem>
                }
                { props.deviceState.hasOwnProperty('Humidity') &&
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={'Humidity'} />
                        <Typography>{ props.deviceState['Humidity'].rangeValue.value }</Typography>
                    </ListItem>
                }
                { props.deviceState.hasOwnProperty('Wind Speed') &&
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={'Wind Speed'} />
                        <Typography>{ props.deviceState['Wind Speed'].rangeValue.value }</Typography>
                    </ListItem>
                }
                { props.deviceState.hasOwnProperty('UV Index') &&
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={'UV Index'} />
                        <Typography>{ props.deviceState['UV Index'].rangeValue.value }</Typography>
                    </ListItem>
                }
            </Collapse>
        </CardBase>
    );
}

