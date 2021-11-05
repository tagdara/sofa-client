import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { selectPage } from 'store/layoutHelpers'

import ListItem from '@material-ui/core/ListItem';

import EditIcon from '@material-ui/icons/Edit';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import HistoryIcon from '@material-ui/icons/History';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import Button from '@material-ui/core/Button';
import SubjectIcon from '@material-ui/icons/Subject';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DeviceDialog from 'dialogs/DeviceDialog';


const useStyles = makeStyles(theme => {
    return {   
        versionLine: {
            justifyContent: "space-around",
        }
    }
})

export default function AdminFeatures(props) {
    
    const classes = useStyles();
    const [ showDialog, setShowDialog] = useState(false);

    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    function closeDialog() {
        setShowDialog(false)
    }
    
    function toggleLogSSE() {
        // needs to be re-implemented if needed
    }

    return (
        <>
            <ListItem className={classes.versionLine}>
                <Button>{"Version " + process.env.REACT_APP_VERSION}</Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<SettingsEthernetIcon />} onClick={() => selectPage('AdapterLayout')}>
                    Adapter Management
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<EditIcon />} onClick={()=> otherPort('8444','_editor')}>
                    Editor
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<AvTimerIcon />} onClick={() => selectPage('RecentLayout')}>
                    Recent Activity
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<SubjectIcon />} onClick={() => toggleLogSSE()}>
                    Toggle SSE Log
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<SyncAltIcon />} onClick={() => selectPage('ApiRegistration')}>
                    Adapter Registration
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<HistoryIcon />} onClick={() => selectPage('DeviceHistory')}>
                    Device History
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<DevicesOtherIcon />} onClick={() => selectPage('DeviceLayout')}>
                    Device Management
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<AvTimerIcon />} onClick={() => selectPage('ActionLayout')}>
                    Actions
                </Button>
            </ListItem>
            <ListItem>
                <Button fullWidth variant="outlined" startIcon = {<DevicesOtherIcon />} onClick={() => setShowDialog(true)}>
                    Device Dialog
                </Button>
            </ListItem>
            <DeviceDialog open={showDialog} close={closeDialog} />
        </>
    )
};
