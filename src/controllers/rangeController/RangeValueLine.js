import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RangeValueText from 'controllers/rangeController/RangeValueText'
import { hasInstance } from 'store/deviceHelpers'

const useStyles = makeStyles(theme => {
    return {      
        listItem: {
            paddingTop: 0,
            paddingBottom:0,
            width: '100%',
        },
    }
})
 
const RangeValueLine = props => {
    const classes = useStyles();

    if (!hasInstance(props.endpointId, props.instance)) {
        return null
    }

    return (
        <ListItem className={classes.listItem} >
            <ListItemText primary={props.instance} />
            <RangeValueText endpointId={props.endpointId} instance={props.instance} />
        </ListItem>
    );
}

export default RangeValueLine;
