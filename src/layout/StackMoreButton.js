import React from 'react';

import { makeStyles } from '@mui/styles';

import Chip from '@mui/material/Chip';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const useStyles = makeStyles(theme => {
    return {
        actionsChip: {
            justifyContent: "center",
            backgroundColor: theme.palette.layer.card,
            '&:hover': {
                borderColor: theme.palette.primary.dark,
            },
            maxHeight: 26,
        },
        actionsChipIcon: {
            height: 28,
            width: 28,
        }
    }
});

const StackMoreButton = props => {
    
    const classes = useStyles();

    return (
        <Chip
            className = { classes.actionsChip }
            label={ !props.expand ? "More" : "Less" }
            icon={ !props.expand ? <ExpandMoreIcon /> : <ExpandLessIcon /> }
            clickable
            onClick = { props.onClick }
        />
    );
}

export default StackMoreButton;
