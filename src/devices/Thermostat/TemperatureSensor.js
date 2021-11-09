import React, { useState }from 'react';
//import { selectPage } from 'store/layoutHelpers'
import { makeStyles } from '@mui/styles';

import CardLine from 'components/CardLine'
import TemperatureSensorAvatar from 'controllers/temperatureSensor/TemperatureSensorAvatar'

import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import ItemBase from 'components/ItemBase'
import RangeValueLine from 'controllers/rangeController/RangeValueLine'
import { deviceByEndpointId, hasInstance} from 'store/deviceHelpers'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
    const [ showDetail, setShowDetail ] = useState(false)
    const additionalAttributes = ['Light Level', 'Humidity', 'Wind Speed', 'UV Index', 'Rainfall']
    const device = deviceByEndpointId(props.endpointId)
    const name = device.friendlyName

    //function switchToHistory() {
    //    selectPage('ThermostatHistory', { 'endpointId' : props.endpointId, 'past':'7d'})
    //}
    
    function toggleDetail() {
        setShowDetail(!showDetail)
    }

    function checkMoreData() {
        for (var k = 0; k < additionalAttributes.length; k++) {
            if (hasInstance(props.endpointId, additionalAttributes[k])) {
                return true
            }
        }
        return false
    }

    const hasMoreData = checkMoreData()

    return (
        <ItemBase hasCollapse={hasMoreData} itemType={props.itemType}>
            <CardLine onClick={props.onClick ? props.onClick : toggleDetail }>
                <TemperatureSensorAvatar endpointId={props.endpointId} />
                <ListItemText primary={name} />
                { hasMoreData && 
                    <IconButton onClick={toggleDetail} size={"small"}>
                        { showDetail ? <ExpandLessIcon/> : <ExpandMoreIcon /> }
                    </IconButton>
                }
            </CardLine>     
            { hasMoreData &&           
                <Collapse in={showDetail} className={classes.detail}>
                    { additionalAttributes.map( attribName => 
                        <RangeValueLine endpointId={props.endpointId} instance={attribName} key={attribName+props.endpointId} />
                    )}
                </Collapse>
            }
        </ItemBase>
    );
}

export default TemperatureSensor;
