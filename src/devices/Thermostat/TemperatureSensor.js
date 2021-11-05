import React, { useContext, useState, useEffect }from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import ItemBase from 'components/ItemBase'
import SofaListItem from 'components/SofaListItem';

import useDeviceStateStore from 'store/deviceStateStore'
import useDeviceStore from 'store/deviceStore'
import { register, unregister } from 'store/deviceHelpers'

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
 
const TemperatureSensor = props => {
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const [ showDetail, setShowDetail ] = useState(false)
    const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index', 'Rainfall']
    const device = useDeviceStore( state => state.devices[props.endpointId] )
    const deviceState  = useDeviceStateStore( state => state.deviceStates[props.endpointId] )
    const name = device.friendlyName
    const temperatureSensor = deviceState.TemperatureSensor

    useEffect(() => {
        register(props.endpointId, 'TemperatureSensor-'+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, 'TemperatureSensor-'+props.endpointId)
        };
    // eslint-disable-next-line 
    }, []) 

    if (!deviceState) { return null }

    const deviceAttributes = additionalAttributes.filter( attribute => deviceState.hasOwnProperty(attribute))

    function tempColor(temp) {
        if (!temp) { return 'disabled' }
        if (temp>=74) { return "hot" }
        if (temp<70) { return "cool" }
        return "mid";
    }
    
    function switchToHistory() {
        selectPage('ThermostatHistory', { 'endpointId':props.endpointId, 'past':'7d'})
    }
    
    function toggleDetail() {
        setShowDetail(!showDetail)
    }
    return (
        <ItemBase small={true} hasCollapse={true}>
            <SofaListItem   avatar={ temperatureSensor.temperature.value ? temperatureSensor.temperature.deepvalue : '--'} 
                            labelClick={props.onClick ? props.onClick : toggleDetail} avatarClick={() => switchToHistory()} 
                            avatarState={ tempColor( temperatureSensor.temperature.deepvalue) }
                            primary={ name } />
            <Collapse in={showDetail} className={classes.detail}>
                { deviceAttributes.map( attribName => 
                    <ListItem className={classes.listItem} key={attribName}>
                        <ListItemText primary={attribName} />
                        <Typography>{ deviceState[attribName].rangeValue.value }</Typography>
                    </ListItem>
                )}
            </Collapse>
        </ItemBase>
    );
}

export default TemperatureSensor;
