import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItemText from '@material-ui/core/ListItemText';

import SofaSlider from './SofaSlider';
import ToggleAvatar from './ToggleAvatar'

const useStyles = makeStyles({
         
    label: {
        display: "flex",
        flexGrow: 1,
        flexBasis: 0,
        minWidth: "35%",
        alignItems: "center",
    },
    line: {
        boxSizing: "border-box",
        display: "flex",
        width: '100%',
        maxWidth: '100%',
        flexGrow: 1,
        flexBasis: 0,
        minHeight: 48,
        padding: "0 16px",
        alignItems: "center",
    },
    noPad: {
        boxSizing: "border-box",
        display: "flex",
        width: '100%',
        maxWidth: '100%',
        flexGrow: 1,
        flexBasis: 0,
        padding: 0,
        alignItems: "center",
    }
})

export default function SofaAvatarSlider(props) {
    
    const classes = useStyles();
    const [value, setValue] = useState(0);

    useEffect(() => {
  	    setValue(props.value)
    }, [props.value]);

    function handlePreChange(value) {
        setValue(value)
        if (props.hasOwnProperty('preChange')) {
            props.preChange(value)
        }
    }; 
    
    return (
        <div className={props.noPad ? classes.noPad : classes.line}>
            { !props.reverse &&
                <ToggleAvatar small={props.small} onClick={props.avatarClick} noback={props.noAvatarBack} avatarState={ props.avatarState }>
                    {value+props.avatarUnit}
                </ToggleAvatar>
            }
            { props.iconLabel &&
                props.iconLabel
            }
            { props.label &&
                <ListItemText primary={props.label} className={classes.label} />
            }

            <SofaSlider {...props} preChange={handlePreChange} />
            { props.reverse &&
                <ToggleAvatar reverse={props.reverse} small={props.small} onClick={props.avatarClick} noback={props.noAvatarBack} avatarState={ props.avatarState }>
                    {value+props.avatarUnit}
                </ToggleAvatar>
            }
        </div>
    );
}

SofaAvatarSlider.defaultProps = {
    avatarClick:undefined,
    noAvatarBack: false,
    avatarState: "on",
    reverse: true,
    small: false,
    avatarUnit: "",
    noPad: false,
    
}

