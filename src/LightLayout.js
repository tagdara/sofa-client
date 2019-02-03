import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Light from './light/Light';
import GridBreak from './GridBreak';

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
});

function LightLayout(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('ON');
    const isMobile = window.innerWidth <= 800;
    const [changeTimes, setChangeTimes] = useState([])
    const [brightControl, setBrightControl] = useState(false)
    const [tempControl, setTempControl] = useState(false)
    const [colorControl, setColorControl] = useState(false)

    function filterByType(filter) {
        var lights=[]
        var all=props.devicesByCategory('LIGHT')
        if (filter=="ALL") { return all }
        for (var j = 0; j < props.devicesByCategory('LIGHT').length; j++) {
            if (props.deviceProperties[all[j].friendlyName].powerState==filter) {
                lights.push(all[j])
            }
        }
        return lights
            
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Lights"}>
                <Button onClick={ () => setFilter('ALL')} color={ filter=='ALL' ? "primary" : "default"} className={classes.button }>
                    All
                </Button>
                <Button onClick={ () => setFilter('ON')} color={ filter=='ON' ? "primary" : "default"} className={classes.button }>
                    On
                </Button>
            </GridBreak>
            <GridBreak >
                <Button onClick={ () => setBrightControl(!brightControl) } color={ brightControl ? "primary" : "default"} className={classes.button }>
                    Bright
                </Button>
                <Button onClick={ () => setTempControl(!tempControl) } color={ tempControl ? "primary" : "default"} className={classes.button }>
                    Temp
                </Button>
                <Button onClick={ () => setColorControl(!colorControl) } color={ colorControl ? "primary" : "default"} className={classes.button }>
                    Color
                </Button>
            </GridBreak>

            { filterByType(filter).map((device) =>
                <Light key={ device.endpointId } sendAlexaCommand={props.sendAlexaCommand} name={ device.friendlyName }
                    device={ device } deviceProperties={ props.deviceProperties[device.friendlyName] } 
                    brightControl={brightControl} tempControl={tempControl} colorControl={colorControl}
                    />
            )}

        </React.Fragment>
    )

};

export default withData(LightLayout);