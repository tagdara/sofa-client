import React from 'react';
import { useState } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import CloseIcon from '@material-ui/icons/Close';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CropFreeIcon from '@material-ui/icons/CropFree';

import DeviceDialog from '../DeviceDialog';
import DeviceIcon from '../DeviceIcon';
import Grid from '@material-ui/core/Grid';

export default function AutomationDevice(props) {

    const [deviceSelect, setDeviceSelect] = useState(false);

    function closeDialog() {
        setDeviceSelect(false)
    }
    
    function selectDevice(newdevice) {
        props.selectDevice(newdevice)
        setDeviceSelect(false)
    }

    return (
        <Grid item xs={props.wide ? 12 : 4 } >
            <ListItem>
                { props.device===undefined ?
                    <>  
                        <ListItemIcon><CropFreeIcon /></ListItemIcon>
                        <Button size="medium" onClick={() => setDeviceSelect(true) }>Choose a device</Button>
                    </>
                :
                    <>
                        <ListItemIcon><DeviceIcon name={props.device.displayCategories[0]} /></ListItemIcon>
                        <ListItemText primary={props.device.friendlyName} secondary={props.device.displayCategories[0]} onClick={() => setDeviceSelect(true) } />
                    </>
                }
                { props.wide && 
                    <>
                        { props.remove &&
                            <ListItemSecondaryAction>
                                <IconButton size="small" onClick={() => props.delete(props.index)}><CloseIcon /></IconButton>     
                            </ListItemSecondaryAction>
                        }
                        { props.reorder &&
                            <ListItemSecondaryAction>
                                { props.index > 0 &&
                                    <IconButton size="small" onClick={() => props.moveUp(props.index)}><ExpandLessIcon /></IconButton>
                                }
                                <IconButton size="small" onClick={() => props.moveDown(props.index)}><ExpandMoreIcon /></IconButton>
                            </ListItemSecondaryAction>
                        }
                    </>
                }
            </ListItem>
            { deviceSelect &&
                <DeviceDialog open={true} close={closeDialog} select={selectDevice} />
            }
        </Grid>
    )
}
