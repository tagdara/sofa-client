import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';

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
