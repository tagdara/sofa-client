import React from 'react';
import { useState, useEffect } from 'react';

import SecurityCamera from './camera/securitycamera';
import VideocamIcon from '@material-ui/icons/Videocam';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function CameraLayout(props) {

    const [cameras, setCameraList] = useState({});
    
    useEffect(() => {
        fetch('/data/cameras')
            .then(result=>result.json())
            .then(data=>setCameraList(data))
    }, []);
    
    function openNVR() {
        var newurl="https://unifi-video.dayton.tech:7443"
        var tabname="_nvr"
        window.open(newurl,tabname);
    }
    
    return (
        <React.Fragment>
            { Object.keys(cameras).map(name => 
                <SecurityCamera key={name} name={ name } cameraSource={cameras[name].source} />
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
