import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';

const useStyles = makeStyles(theme => {
    return {        
        spinner: {
            margin :0,
        }
    }
})

const ComputerWol = props => {

    const classes = useStyles();
    const [ wolFlip, setWolFlip ]=useState(false)
    
    function turnOn() {
        setWolFlip(true)
        props.directive(props.endpointId, "PowerController", "TurnOn", {}, {}, "")
    }; 

    return  (
        wolFlip ? 
            <CircularProgress size={24} className={classes.spinner} onClick={ () => turnOn() } />
        :
            <IconButton size={"small"} onClick={ () => turnOn() } >
                <WifiTetheringIcon />
            </IconButton>  
    )
}

export default ComputerWol;
