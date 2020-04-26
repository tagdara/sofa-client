import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function AutomationMove(props) {
    
    return (
        !props.wide && 
        <>
            { props.remove &&
                <ListItemSecondaryAction>
                    <IconButton size="small" onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
            }
            { props.reorder &&
                <ListItemSecondaryAction>
                    { props.index > 0 &&
                        <IconButton size="small" onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>
                    }
                    <IconButton size="small" onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                </ListItemSecondaryAction>
            }
        </>
    )
}
