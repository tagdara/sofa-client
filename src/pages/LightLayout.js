import React, { useState, useContext }  from 'react';
import { makeStyles } from '@material-ui/styles';
import { DeviceContext } from 'DataContext/DeviceProvider';

import Button from '@material-ui/core/Button';

import ColorLensIcon from '@material-ui/icons/ColorLens';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

import Light from 'devices/Light/Light';
import GridSection from 'components/GridSection';


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
    smallicon: {
        width: 18,
    }
});
const LightLayout = props => {

    const classes = useStyles();
    const { devicesByCategory } = useContext(DeviceContext);
    const lights = devicesByCategory('LIGHT')
    const [filter, setFilter] = useState(props.filter);
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)

    return (    
        <GridSection name={"Lights"} scroll={true}
                secondary={
                    <>
                        <Button onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                            <BrightnessLowIcon className={classes.smallicon } />
                        </Button>
                        <Button onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                            <AcUnitIcon className={classes.smallicon } />
                        </Button>
                        <Button onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.buttonspacer }>
                            <ColorLensIcon className={classes.smallicon } />
                        </Button>
        
                        <Button onClick={ () => setFilter('ALL')} color={ filter==='ALL' ? "primary" : "default"} className={classes.button }>
                            All
                        </Button>
                        <Button onClick={ () => setFilter('ON')} color={ filter==='ON' ? "primary" : "default"} className={classes.button }>
                            On
                        </Button>
                    </>
                }
        >
            { lights.map((device) =>
                <Light  key={ device.endpointId } endpointId={device.endpointId} brightControl={brightControl} tempControl={tempControl} colorControl={colorControl} filter={filter} />
            )}
        </GridSection>
    )
}

export default LightLayout;

LightLayout.defaultProps = {
    filter: "ON",
}