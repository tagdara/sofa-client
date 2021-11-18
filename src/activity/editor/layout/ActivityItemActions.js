import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { moveActivityItemUp, moveActivityItemDown, removeActivityItem } from 'store/activityEditorHelpers'

const useStyles = makeStyles(theme => {
    return {
        actions: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: 56,
            backgroundColor: theme.palette.action.disabled,
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
        },
    }
});

const ActivityItemActions = props => {

    const classes = useStyles();   

    return (
        <div className={classes.actions}>
            { props.removing &&
                <IconButton size="small" onClick={() => removeActivityItem(props.category, props.index)}><CloseIcon /></IconButton>     
            }
            { (props.reordering) &&
                <IconButton disabled={props.index < 1 } size="small" onClick={() => moveActivityItemUp(props.category, props.index)}><ExpandLessIcon /></IconButton>
            }
            { (props.reordering) &&
                <IconButton size="small" disabled={props.index > props.count-1} onClick={() => moveActivityItemDown(props.category, props.index)}><ExpandMoreIcon /></IconButton>
            }
        </div>
    )
}

export default ActivityItemActions