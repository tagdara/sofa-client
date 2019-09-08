import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => {
    return {        
        off: {
            margin: 4,
            color: theme.palette.primary.contrastText, 
            '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                }
        },
        on: {
            margin: 4,
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
            '&:hover': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                },
            '&:focus': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
            }
        }
    }
});

export default function ToggleChip(props) {

    const classes = useStyles();

    return (
        <Chip 
            label={props.label}
            className={ classes[props.chipState] }
            onClick={ props.onClick}
        />
    )
};



