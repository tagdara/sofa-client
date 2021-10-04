import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => {
    return {        
        off: {
            minWidth: 36,
            marginLeft: 2,
        },
        on: {
            marginLeft: 2,
            minWidth: 36,
            "&:hover" : {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
    }
});

export default function ToggleButton(props) {

    const classes = useStyles();
    
    return (
        <Button size="small" className={ classes[props.buttonState] } onClick={ props.onClick} >
            {props.label ? props.label : props.children}
        </Button>
    )
};
