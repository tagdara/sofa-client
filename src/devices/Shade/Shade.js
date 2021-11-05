import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import TonalityIcon from '@material-ui/icons/Tonality';
import SofaListItem from 'components/SofaListItem';

import { directive } from 'store/directive'
import { deviceByEndpointId } from 'store/deviceHelpers'

import useDeviceStateStore from 'store/deviceStateStore'
import useRegisterStore from 'store/registerStore'

const useStyles = makeStyles(theme => {
    return {      
        button: {
            backgroundColor: theme.palette.background.button,
            borderColor: "rgba(255,255,255, 0) !important",
            marginRight: 1,
            padding: "3px 8px"
        },
        buttonRight: {
            padding: "3px 8px",
            backgroundColor: theme.palette.background.button,
        },
        
        item: {
            minHeight: 54,
        }
    }
})

const Shade = props => {

    const classes = useStyles();

    const device = deviceByEndpointId(props.endpointId)   
    const deviceState = useDeviceStateStore( state => state.deviceStates[props.endpointId])
    const register = useRegisterStore( state => state.add)
    const unregister = useRegisterStore( state => state.remove)

    useEffect(() => {
        register(props.endpointId, "shade-"+props.endpointId)
        return function cleanup() {
            unregister(props.endpointId, "shade-"+props.endpointId)
        };
    // eslint-disable-next-line 
    }, [])

    if (!deviceState) { return null }

    function handlePress(modechoice) {
        directive(props.endpointId, 'ModeController', 'SetMode', { "mode": modechoice}, {}, 'Blinds.Position')
    }
    
    return ( 
        <SofaListItem   inList={props.inList} avatarBackground={false} avatarState={ 'off' } avatar={ props.icon ? props.icon : <TonalityIcon />}
                        primary={device.friendlyName}>

            <ButtonGroup className={classes.buttonGroup} size="small" variant="text"  >
                <Button className={classes.button} onClick={ () => handlePress('Position.Down') }><ExpandMoreIcon /></Button>
                <Button className={classes.button} onClick={ () => handlePress('Position.Stop') }><RemoveIcon /></Button>
                <Button className={classes.buttonRight} onClick={ () => handlePress('Position.Up') }><ExpandLessIcon /></Button>
            </ButtonGroup>
        </SofaListItem>
    );
}

export default Shade;

Shade.defaultProps ={
    inList: false,
}

