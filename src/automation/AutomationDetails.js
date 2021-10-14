import React, { useState, useContext } from 'react';
import { DeviceStateContext } from 'context/DeviceStateContext';

import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import LowPriorityIcon from '@material-ui/icons/LowPriority';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AutomationDetails(props) {

    const { directive } = useContext(DeviceStateContext);
    const [ showResult, setShowResult]=useState(false)
    const [ resultMessage, setResultMessage]=useState('')
    const [ severity, setSeverity]=useState('info')
    
    function runAutomation(conditions=true) {
        directive(props.endpointId, 'SceneController', 'Activate', {}, {"conditions": conditions})
            .then(result=> { parseResult(result) })
    }
    
    function parseResult(result) {
        try {
            if (result.event.header.name==='ErrorResponse') {
                setResultMessage(result.event.payload.message); 
                setSeverity('error')
                setShowResult(true); 
            }
            if (result.event.header.name==='ActivationStarted') {
                setResultMessage('Activation started'); 
                setSeverity('success')
                setShowResult(true); 
            }
        }
        catch {}
    }
    
    function handleClose() {
        setShowResult(false)
    }

    return (    
        <ListItem>
            <ListItemText primary={"Last Run"} secondary={ props.automation.lastrun && props.automation.lastrun!=='never' ? <Moment utc format="ddd MMM D h:mm:sa">{props.automation.lastrun }</Moment> : 'Never'} />
            <Typography variant="overline">{ props.endpointId }</Typography>
            <IconButton onClick={() => runAutomation()}><PlaylistPlayIcon /></IconButton>
            <IconButton onClick={() => runAutomation(false)}><LowPriorityIcon /></IconButton>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}} open={showResult} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity={severity}>{resultMessage}</Alert>
            </Snackbar>
        </ListItem>
    )

};
