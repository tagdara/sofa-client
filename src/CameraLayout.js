import React, { useContext, useEffect, useState} from 'react';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';
import SecurityCamera from './camera/securitycamera';
import Laundry from './camera/laundry';
import VideocamIcon from '@material-ui/icons/Videocam';
import List from '@material-ui/core/List';
import GridSection from './GridSection';
import Button from '@material-ui/core/Button';
import SofaListItem from './SofaListItem';

// Current Material icons does not include the updated QrCode icon
import QrCodeIcon from '@material-ui/icons/DeveloperMode';

const useStyles = makeStyles({
    smallicon: {
        width: 18,
    },
    button: {
        minWidth: 36
    },
}
)
export default function CameraLayout(props) {
    
    const { cardReady, devices, deviceState, getEndpointIdsByCategory, unregisterDevices, directive } = useContext(DataContext);
    const [cameras, setCameras]=useState([])
    const [ showQR, setShowQR]=useState(false)
    const classes = useStyles();
    
    useEffect(() => {
        setCameras(getEndpointIdsByCategory('CAMERA','CameraLayout'))
        return function cleanup() {
            unregisterDevices('CameraLayout');
        };
    // eslint-disable-next-line 
    }, [ ] )

    function openNVR() {
        var newurl="https://unifi.dayton.tech:7443/"
        var tabname="_nvr"
        window.open(newurl,tabname);
    }
    
    function getLaundry() {
        for (var i = 0; i < cameras.length; i++) {
            if (devices[cameras[i]].friendlyName==='Laundry Camera') {
                return cameras[i]
            }
        }
        return false
    }
    
    return (
        cardReady('CameraLayout') &&
        <React.Fragment>
        <GridSection name={"Cameras"} secondary={
            <Button onClick={ () => setShowQR(!showQR) } className={classes.button} >
                <QrCodeIcon className={classes.smallicon } />
            </Button> }
        >
            { cameras.map(camera => 
                <SecurityCamera qr={showQR} camera={camera} key={camera} device={ devices[camera] } deviceState={ deviceState(camera) } name={ devices[camera].friendlyName } directive={directive} />
            )}

        </GridSection>
        <GridSection>
        { getLaundry() &&
            <Laundry qr={showQR} camera={ getLaundry() } key={'laundryzoom'} device={ devices[getLaundry()] } 
                    name={ 'Laundry' } directive={directive} />
        }
        <List>
            <SofaListItem button onClick={() => openNVR() } avatar={<VideocamIcon />} avatarState={"off"} primary={'Unifi Protect'} />
        </List>
        </GridSection>
        </React.Fragment>
    )
}
