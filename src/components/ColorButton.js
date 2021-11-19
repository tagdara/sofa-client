import React from 'react';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => {
    return {        
        off: {
            minWidth: "36px !important",
            marginLeft: 2,
        },
        on: {
            marginLeft: 2,
            minWidth: "36px !important",
            "&:hover" : {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
        },
        button: {
            minWidth: "36px !important",    
        }
    }
});

const ColorButton = props => {

    const classes = useStyles(props.color);

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
    
    return (
        <Button sx={{ color: computeColor() }} size={props.size ? props.size : "small"} className={ classes.button } onClick={ props.onClick} >
            {props.label ? props.label : props.children}
        </Button>
    )
};

export default ColorButton
