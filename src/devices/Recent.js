import React from 'react';
import { makeStyles } from '@material-ui/styles';

import Moment from 'react-moment';
import 'moment-timezone';
import ToggleAvatar from '../ToggleAvatar';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CardBase from '../CardBase';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import moment from 'moment'

const useStyles = makeStyles(theme => {
    
    return {
        lowLine: {
            width: "100%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            padding: "0px 16px",
        },
        header: {
            paddingBottom: 0,
        },
        details: {
            paddingBottom: 8,
        }
    }
})

export default function Recent(props) { 
    
    const today=moment()
    const classes = useStyles();
    const excludeItems=["url", "art", "pid", "startTime", "album", "color", "connectivity", "activeState", "subState", "process", "logged",
                        "Humidity", "Light Level", "Wind Speed"]
    
    function getChangeTime() {
        try {
            for (var i = 0; i < props.item.event.payload.change.properties.length; i++) {
                return props.item.event.payload.change.properties[i].timeOfSample
            }
        }
        catch {
            return ""
        }
    }
    
    function filterChanges() {
        var results=[]
        for (var i = 0; i < props.item.event.payload.change.properties.length; i++) {
            if (!excludeItems.includes(props.item.event.payload.change.properties[i].name)) {
                if (!props.item.event.payload.change.properties[i].hasOwnProperty('instance') || !excludeItems.includes(props.item.event.payload.change.properties[i].instance.split('.')[1])) {
                    if (props.item.event.payload.change.properties[i].value.hasOwnProperty('value')) {
                        var newitem={...props.item.event.payload.change.properties[i]}
                        newitem.value=newitem.value.value
                        results.push(newitem)
                    } else {
                        results.push(props.item.event.payload.change.properties[i])
                    }
                }
            }
        }
        return results
    }

    return (
        filterChanges().length>0 ?
        <CardBase >
            <ListItem className={classes.header} >
                <ToggleAvatar avatarState={ 'closed' } > 
                     <AvTimerIcon /> 
                </ToggleAvatar>
                <ListItemText   primary={ moment(getChangeTime()).isSame(today,'d') ? <Moment format="h:mm:sa">{ getChangeTime() }</Moment> : <Moment format="ddd MMM D h:mm:sa">{ getChangeTime() }</Moment> } 
                                secondary={ props.device ? props.device.friendlyName : props.item.event.endpoint.endpointId } 
                />
            </ListItem>
            <div className={classes.details}>
            { filterChanges().map((change,idx) =>
                <div key={idx} className={classes.lowLine}>
                    <Typography variant="caption">{ (change.instance ? change.instance : change.name)+" = "+change.value.toString() } </Typography>
                </div>
            )}
            </div>
        </CardBase>
        : null
    );
}
