import React from 'react';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles(theme => {
    return {        
        off: {
            marginLeft: 4,
            marginRight: 8,
        },
        on: {
            marginLeft: 4,
            marginRight: 8,
            "&:hover" : {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    }
});

export default function ToggleIconButton(props) {

    const classes = useStyles();
    
    return (
        <IconButton size="small" className={ classes[props.buttonState] } onClick={ props.onClick} disabled={props.disabled}>
            { props.buttonState==='on' ? props.onIcon : props.offIcon }
        </IconButton>
    )
};
