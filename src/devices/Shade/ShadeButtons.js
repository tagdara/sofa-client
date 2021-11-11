import React from 'react';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';

import { directive } from 'store/directive'

const useStyles = makeStyles(theme => {
    return {    
        button: {        
            backgroundColor: theme.palette.action.disabledBackground+" !important",
            color: theme.palette.text.primary+" !important",
            borderColor: theme.palette.action.disabled+" !important",
            marginRight: 1,
            padding: "3px 8px",
            "&:hover" : {
                backgroundColor: theme.palette.action.disabled+" !important",
            },
        },
        xbuttonRoot: {
            backgroundColor: theme.palette.action.disabled,
        }
    }
})

const ShadeButtons = props => {

    const classes = useStyles();

    function handlePress(modechoice) {
        directive(props.endpointId, 'Blinds.Position', 'SetMode', { "mode": modechoice}, {})
    }
    
    return ( 
        <ButtonGroup className={classes.buttonGroup} size="small" variant="text" >
            <Button className={classes.button} onClick={ () => handlePress('Position.Down') }><ExpandMoreIcon /></Button>
            <Button className={classes.button} onClick={ () => handlePress('Position.Stop') }><RemoveIcon /></Button>
            <Button className={classes.button} onClick={ () => handlePress('Position.Up') }><ExpandLessIcon /></Button>
        </ButtonGroup>
    );
}

export default ShadeButtons;

