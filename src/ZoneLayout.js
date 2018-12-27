import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Zone from './devices/zone';
import GridBreak from './GridBreak';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    }

});

function ZoneLayout(props) {

    const classes = useStyles();
    const [filter, setFilter] = useState('all');
    const isMobile = window.innerWidth <= 800;
    const [changeTimes, setChangeTimes] = useState({})

    useEffect(() => {
        props.getChangeTimesForDevices('position',props.devicesByCategory('ZONE')).then(result => setChangeTimes(result))
    }, []);

    function zoneCount(condition) {
        var count=0;
        for (var dev in this.props.deviceProperties) {
            if (condition=='all' || this.props.deviceProperties[dev].position==condition) {
                if (props.deviceProperties[dev].type=='Alarm') {
                    count=count+1
                }
            }
        }
        return count
    }


    function toggleFilter(event) {
        if (filter=='open') {
            setFilter({ filter:'all'})
        } else {
            setFilter({ filter:'open'}) 
        }
    }
    
    function filterByType(zonetype) {
        var typezones=[]
        var allzones=props.devicesByCategory('ZONE')
        for (var j = 0; j < props.devicesByCategory('ZONE').length; j++) {
            if (props.deviceProperties[allzones[j].friendlyName].type==zonetype) {
                typezones.push(allzones[j])
            }
        }
        return typezones
            
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Security Zones"} />

            { filterByType('Alarm').map((device) =>
                <Zone key={ device.endpointId } name={ device.friendlyName } filter={ filter} device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"} deviceProperties={ props.deviceProperties[device.friendlyName] } />
            )}
            <GridBreak label={"Automation Zones"} />
            { filterByType('Automation').map((device) =>
                <Zone key={ device.endpointId } name={ device.friendlyName } filter={ filter} device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"} deviceProperties={ props.deviceProperties[device.friendlyName] } />
            )}
        </React.Fragment>
    )

};

export default withData(ZoneLayout);