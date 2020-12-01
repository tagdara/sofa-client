import React, { useContext } from 'react';
import { DeviceContext } from '../DataContext/DeviceProvider';
import { makeStyles } from '@material-ui/styles';

import CardBase from '../CardBase';
import DeviceIcon from '../DeviceIcon';
import CompactPropertyValue from './CompactPropertyValue';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CropFreeIcon from '@material-ui/icons/CropFree';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({

    deviceButton: {
        width: "100%",
        height: 56,
        borderRadius: 4,
    },
    deviceLine: {
        display: "flex",
        height: 64,
        alignItems: "center",
    },
    typeLine: {
        fontSize: 10,
    },
    primary: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    lineItem: {
        width: "33%",
    },
    topItem: {
        paddingBottom: 0
    },
    bottomItem: {
        paddingTop: 0
    }
});

export default function DisplayAction(props) {
    
    const { getControllerInterface, deviceDirectives, directive } = useContext(DeviceContext);
    const directiveMap = deviceDirectives(props.device)
    const classes = useStyles();
    
    const camel2title = (camelCase) => camelCase
                            .replace(/([A-Z])/g, (match) => ` ${match}`)
                            .replace(/^./, (match) => match.toUpperCase());
                            
    function defaultOrValue() { 
        for (var j = 0; j < directiveMap.length; j++) {
            if ((directiveMap[j].instance===props.data.instance) && (directiveMap[j].controller===props.data.controller) && (directiveMap[j].directive===props.data.command)) {
                if (directiveMap[j].instance) {
                    //return directiveMap[j].instance.split('.')[1]+"."+directiveMap[j].directive
                    return camel2title(directiveMap[j].instance.split('.')[1])
                }
                return camel2title(directiveMap[j].directive)
            }
        }
        return ""
    }
    
    //  onClick={ props.toggleEdit }
    return (
        <CardBase wide={false} small={true} >
            { props.device.endpointId==='logic.logic.if' ?
                <ListItem className={classes.topItem}>
                    <ListItemText classes={{ primary: classes.primary, secondary: classes.typeLine}} className={classes.lineItem}
                                    primary={ props.device.command}  />
                </ListItem>            
            :
            <>
                <ListItem className={classes.topItem}>
                    <ListItemIcon >{ props.device===undefined ? <CropFreeIcon /> : <DeviceIcon name={props.device.displayCategories[0]} /> }</ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary, secondary: classes.typeLine}} className={classes.lineItem}
                                    primary={props.device ? props.device.friendlyName : "No device"} secondary={props.device && props.device.displayCategories[0]} />
                    <MoreVertIcon onClick={props.toggleEdit} />
                </ListItem >
                <ListItem className={classes.bottomItem}>
                    <ListItemText classes={{ primary: classes.primary, secondary: classes.typeLine}} className={classes.lineItem}
                                    primary={props.device ? defaultOrValue() : "No device"} secondary={props.data.controller} />
                    <CompactPropertyValue index={props.index} device={props.device} item={props.data} wide={props.wide} 
                                    interface={ getControllerInterface(props.device, props.data) } directive={directive} />
    
                </ListItem>
            </>
            }
        </CardBase>
    )
}
