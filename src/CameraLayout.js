import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';

import SecurityCamera from './camera/securitycamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GridSection from './GridSection';
import CameraQR from './CameraQR';


export default function CameraLayout(props) {
    
    const { deviceStatesByCategory, directive } = useContext(DataContext);
    const cameras=deviceStatesByCategory(['CAMERA'])

    function openNVR() {
        var newurl="https://unifi-video.dayton.tech:7443"
        var tabname="_nvr"
        window.open(newurl,tabname);
    }
    
    return (
        <React.Fragment>
        <GridSection name={"Cameras"}>
            { cameras.map(camera => 
                <SecurityCamera camera={camera} key={camera.endpointId} name={ camera.friendlyName } directive={directive} />
            )}
        </GridSection>
        <GridSection>
        <List>
            <ListItem button onClick={() => openNVR() }>
                <ListItemIcon>
                    <VideocamIcon />
                </ListItemIcon>
                <ListItemText primary={'Unifi NVR'} />
            </ListItem>
        </List>
        </GridSection>
        <GridSection name={"QR Codes"} show={false}>
            { cameras.map(camera => 
                <CameraQR cameraId={camera.endpointId} key={camera.endpointId} name={ camera.friendlyName } />
            )}
        </GridSection>

        </React.Fragment>
    )
}
