import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import SecurityCamera from './camera/securitycamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function CameraLayout(props) {
    
    const { deviceStatesByCategory } = useContext(DataContext);
    const cameras=deviceStatesByCategory(['CAMERA'])

    function openNVR() {
        var newurl="https://unifi-video.dayton.tech:7443"
        var tabname="_nvr"
        window.open(newurl,tabname);
    }
    
    return (
        <React.Fragment>
            { cameras.map(camera => 
                <SecurityCamera camera={camera} key={camera.endpointId} name={ camera.friendlyName } />
            )}
            <List>
                <ListItem button onClick={() => openNVR() }>
                    <ListItemIcon>
                        <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Unifi NVR'} />
                </ListItem>
            </List>
        </React.Fragment>
    )
}
