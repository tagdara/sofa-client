import React from 'react';

import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
