import React from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircularProgress from '@mui/material/CircularProgress';
import { useLongPress } from 'use-long-press';

const CardLineIcon = props => {

    const bind = useLongPress(() => {}, {
        onFinish: event => { event.stopPropagation(); event.preventDefault(); props.longPress() },
        threshold: 500,
        captureEvent: false,
        cancelOnMovement: false,
        detect: 'both',
    });

    function computeColor() {
        if (props.on === true ) { 
            if (props.color) {
                return props.color
            }
            return 'primary.main' 
        }
        if (props.on === false) {
            return 'action.disabled'
        }
        return props.color
    }

    // style={ color && styles.color }
    return  (
        <ListItemIcon   onClick={ props.onClick } 
                        {...bind} 
                        sx={{ color: computeColor() }}
                    >
            { props.loading ? 
                <CircularProgress size={24}/>
            :
                <> {props.children} </>
            }
        </ListItemIcon>
    )
}

export default CardLineIcon

