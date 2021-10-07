import React, { useContext, useState} from 'react';

import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import VideocamIcon from '@material-ui/icons/Videocam';
import QrCodeIcon from '@material-ui/icons/DeveloperMode'; // Current Material icons does not include the updated QrCode icon

import { DeviceContext } from 'context/DeviceContext';

import SofaListItem from 'components/SofaListItem';
import SecurityCamera from 'devices/Camera/SecurityCamera';
import GridSection from 'components/GridSection';

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
    const { endpointIdsByCategory,sortByName } = useContext(DeviceContext);
    const cameras = sortByName(endpointIdsByCategory('CAMERA'))
    const [ showQR, setShowQR]=useState(false)
    const homekitSupport = false
    const classes = useStyles();
    
    function openNVR() {
        var newurl="https://unifi.dayton.tech/protect"
        var tabname="_nvr"
        window.open(newurl,tabname);
    }
    
    return (
        <>
            <GridSection name={"Cameras"} 
                        secondary={ homekitSupport &&
                            <Button onClick={ () => setShowQR(!showQR) } className={classes.button} >
                                <QrCodeIcon className={classes.smallicon } />
                            </Button> 
                        }
            >
                { cameras.map(camera => 
                    <SecurityCamera key={camera} endpointId={camera} showQR={showQR} />
                )}
            </GridSection>
            <GridSection>
                <List>
                    <SofaListItem button onClick={() => openNVR() } avatar={<VideocamIcon />} avatarState={"off"} primary={'Unifi Protect'} />
                </List>
            </GridSection>
        </>
    )
}
