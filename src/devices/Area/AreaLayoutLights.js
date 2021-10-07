import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import ColorLensIcon from '@material-ui/icons/ColorLens';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

import { DeviceStateContext } from 'context/DeviceStateContext';

import GridSection from 'components/GridSection';
import Light from 'devices/Light/Light'

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
    buttonspacer: {
        minWidth: 36,
        marginRight: 18
    },

});

export default function AreaLayoutLights(props) {

    const classes = useStyles();
    const { cardReady, registerEndpointIds, devices, deviceStates, unregisterDevices, directive } = useContext(DeviceStateContext);
    const [ brightControl, setBrightControl ] = useState(false)
    const [ tempControl, setTempControl ] = useState(false)
    const [ colorControl, setColorControl ] = useState(false);
    const [ filter, setFilter] = useState('ALL');
    
    useEffect(() => {
        registerEndpointIds(props.lights,'AreaLayoutLights')
        return function cleanup() {
            unregisterDevices('AreaLayoutLights');
        };
    // eslint-disable-next-line 
    }, [])

    return (
        cardReady('AreaLayoutLights') ?
        <GridSection name={"Lights"} break={true}
                secondary={
                    <>
                        <IconButton  size={"small"} onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                            <BrightnessLowIcon className={classes.smallicon } />
                        </IconButton>
                        <IconButton  size={"small"} onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                            <AcUnitIcon className={classes.smallicon } />
                        </IconButton>
                        <IconButton  size={"small"} onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.buttonspacer }>
                            <ColorLensIcon className={classes.smallicon } />
                        </IconButton>
        
                        <Button onClick={ () => setFilter('ALL')} color={ filter==='ALL' ? "primary" : "default"} className={classes.button }>
                            All
                        </Button>
                        <Button onClick={ () => setFilter('ON')} color={ filter==='ON' ? "primary" : "default"} className={classes.button }>
                            On
                        </Button>
                    </>
                } 
        >
            { props.lights.map(dev =>
                <Light key={ dev } device={ devices[dev] } deviceState={ deviceStates[dev] } directive={directive} 
                    brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}  noMargin={true} nopaper={true} small={true} noback={true}
                />
            )}        
        </GridSection>
        : null
    )
};

AreaLayoutLights.defaultProps = {
    shortcuts: [],
}