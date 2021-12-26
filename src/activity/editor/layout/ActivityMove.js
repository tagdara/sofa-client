import React from 'react';

import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { moveActivityItemUp, moveActivityItemDown, removeActivityItem } from 'store/activityEditorHelpers'


export default function ActivityMove(props) {
    
    return (
        <>
            { props.removing &&
                <ListItemSecondaryAction>
                    <IconButton size="small" onClick={() => removeActivityItem(props.category, props.index)}><CloseIcon /></IconButton>     
                </ListItemSecondaryAction>
            }
            { props.reordering &&
                <ListItemSecondaryAction>
                    { props.index > 0 &&
                        <IconButton size="small" onClick={() => moveActivityItemUp(props.category, props.index)}><ExpandLessIcon /></IconButton>
                    }
                    <IconButton size="small" onClick={() => moveActivityItemDown(props.category, props.index)}><ExpandMoreIcon /></IconButton>
                </ListItemSecondaryAction>
            }
        </>
    )
}
