import React, { useState, useEffect, useContext }  from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from './DataContext/DataProvider';

import Button from '@material-ui/core/Button';
import Light from './light/Light';
import GridSection from './GridSection';

import ColorLensIcon from '@material-ui/icons/ColorLens';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow';

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

export default function LightLayout(props) {

    const { cardReady, devices, deviceStates, getEndpointIdsByCategory, unregisterDevices, isReachable, directive } = useContext(DataContext);
    const classes = useStyles();
    const [filter, setFilter] = useState('ON');
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)
    const [lights, setLights] = useState([])
    
    useEffect(() => {
        setLights(getEndpointIdsByCategory('LIGHT','LightLayout'))
        return function cleanup() {
            unregisterDevices('LightLayout');
        };
    // eslint-disable-next-line 
    }, [ ] )

    function filterByType(filter) {
        
        var result=[]
        if (filter.toLowerCase()==="all") { 
            return lights
        }
        for (var i = 0; i < lights.length; i++) {   
            if (filter.toLowerCase()==='off' && (deviceStates[lights[i]].PowerController.powerState.value==='OFF' || !isReachable(lights[i]))) {
                result.push(lights[i])
            } else if (filter.toLowerCase()==='on' && deviceStates[lights[i]].PowerController.powerState.value==='ON' && isReachable(lights[i])) {
                result.push(lights[i])
            }            
        }
        return result
            
    }

    return (    
        cardReady('LightLayout') ? 
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
                { filterByType(filter).map((device) =>
                    <Light  key={ device } device={ devices[device] } deviceState={ deviceStates[device] } directive={ directive }  
                            noMargin={true} nopaper={true} noPad={true} noback={true}
                            brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}
                    />
                )}
            </GridSection>
        : null
    )

};