import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import EditIcon from '@material-ui/icons/Edit';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import HistoryIcon from '@material-ui/icons/History';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SubjectIcon from '@material-ui/icons/Subject';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import DeviceDialog from './DeviceDialog';

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            display: "flex",
            padding: 16,
            boxSizing: "border-box",
            width: "100%",
            flexWrap: "wrap",
        },
        spacer: {
            flexGrow:1
        },
        systemButton: {
            marginRight: 8,
        }
    }
})

export default function AdminFeatures(props) {
    
    const classes = useStyles();
    const { selectPage } = useContext(LayoutContext);
    const { toggleLogSSE } = useContext(NetworkContext);
    const [ showDialog, setShowDialog] = useState(false);

    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    function closeDialog() {
        setShowDialog(false)
    }

    return (  
        <div className={classes.iconRow} >
            <IconButton className={classes.systemButton} onClick={() => selectPage('RecentLayout')}>
                <AvTimerIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => toggleLogSSE()}>
                <SubjectIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => selectPage('ApiRegistration')}>
                <SyncAltIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => selectPage('DeviceHistory')}>
                <HistoryIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => selectPage('AdapterLayout')}>
                <SettingsEthernetIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={()=> otherPort('8443','_editor')}>
                <EditIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => selectPage('DeviceLayout')}>
                <DevicesOtherIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => selectPage('ActionLayout')}>
                <AvTimerIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => setShowDialog(true)}>
                <DevicesOtherIcon />
            </IconButton>
            <Button>{process.env.REACT_APP_VERSION}</Button>
            <DeviceDialog open={showDialog} close={closeDialog} />
        </div>
    )
};
