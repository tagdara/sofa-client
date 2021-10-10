import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Chip from '@material-ui/core/Chip';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


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
