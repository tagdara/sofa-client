import React, { useState } from 'react';
import { directive  } from 'store/directive';

import Moment from 'react-moment';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import LowPriorityIcon from '@mui/icons-material/LowPriority';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AutomationDetails(props) {

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
