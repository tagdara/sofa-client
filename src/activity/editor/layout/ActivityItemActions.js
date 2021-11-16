import React from 'react';

import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ActivityItemActions = props => {
    
    return (
        !props.wide && 
        <>
            { props.removing &&
                <ListItemSecondaryAction>
                    <IconButton size="small" onClick={() => props.remove(props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
            }
            { props.reordering &&
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

export default ActivityItemActions