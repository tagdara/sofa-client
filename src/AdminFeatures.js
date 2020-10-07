import React from 'react';
import { useContext } from 'react';
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

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            display: "flex",
            padding: 16,
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
    const { applyLayoutCard } = useContext(LayoutContext);
    const { toggleLogSSE } = useContext(NetworkContext);

    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }

    return (  
        <div className={classes.iconRow} >
            <IconButton className={classes.systemButton} onClick={() => toggleLogSSE()}>
                <SubjectIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => applyLayoutCard('ApiRegistration')}>
                <SyncAltIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => applyLayoutCard('DeviceHistory')}>
                <HistoryIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => applyLayoutCard('AdapterLayout')}>
                <SettingsEthernetIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={()=> otherPort('8443','_editor')}>
                <EditIcon />
            </IconButton>
            <IconButton className={classes.systemButton} onClick={() => applyLayoutCard('DeviceLayout')}>
                <DevicesOtherIcon />
            </IconButton>
            <Button>{process.env.REACT_APP_VERSION}</Button>
        </div>
    )
};