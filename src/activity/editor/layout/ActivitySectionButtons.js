import React from 'react';

import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

const ActivitySectionButtons = props => {

    function reorder() {
        props.setReordering(!props.reordering)
        props.setRemoving(false)
    }

    function remove() {
        props.setRemoving(!props.removing)
        props.setReordering(false)
    }

    return (    
        <div>
            { props.add &&
                <IconButton size="small" onClick={props.add} >
                    <AddIcon fontSize="small" />
                </IconButton>
            }
            { (props.setRemoving && props.count > 0 ) &&
                <IconButton size="small" onClick={remove} >
                    <RemoveIcon fontSize="small" />
                </IconButton>
            }
            { (props.setReordering !== undefined && props.count > 1) &&
                <IconButton size="small" onClick={reorder}>
                    <UnfoldMoreIcon fontSize="small" />
                </IconButton>
            }
        </div>
    )
};

export default ActivitySectionButtons