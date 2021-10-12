import React, { useContext, useState, useEffect }from 'react';
import { LayoutContext } from 'layout/LayoutProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import ItemBase from 'components/ItemBase'
import SofaListItem from 'components/SofaListItem';
import { deviceStatesAreEqual, dataFilter } from 'context/DeviceStateFilter'

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
 
const TemperatureSensor = React.memo(props => {
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const [ showDetail, setShowDetail ] = useState(false)
    const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index']

    useEffect(() => {
        props.addEndpointIds('id', props.endpointId, 'TemperatureSensor-'+props.endpointId)
        return function cleanup() {
            props.unregisterDevices('TemperatureSensor-'+props.endpointId);
        };
    // eslint-disable-next-line 
    }, [])    

    const deviceState = props.deviceState[props.endpointId]
    if (!deviceState) { return null }
    const temperatureSensor = deviceState.TemperatureSensor
    const deviceAttributes = additionalAttributes.filter( attribute => deviceState.hasOwnProperty(attribute))
    const name = props.devices[props.endpointId].friendlyName

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
                    <ListItem className={classes.listItem}>
                        <ListItemText primary={attribName} />
                        <Typography>{ deviceState[attribName].rangeValue.value }</Typography>
                    </ListItem>
                )}
            </Collapse>
        </ItemBase>
    );
}, deviceStatesAreEqual);

export default dataFilter(TemperatureSensor);
