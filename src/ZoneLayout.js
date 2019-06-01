import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Zone from './devices/Zone';
import GridSection from './GridSection';

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
    const [securityZones, setSecurityZones] = useState([])
    const [automationZones, setAutomationZones] = useState([])
    const allzones=props.devicesByCategory(['CONTACT_SENSOR','MOTION_SENSOR'])

    useEffect(() => {
        if (props.securityZones && props.automationZones) {
            setSecurityZones(props.securityZones)
            setAutomationZones(props.automationZones) 
        } else {
      	    fetch('/data/security')
     		    .then(result=>result.json())
                .then(result=>{ console.log('res',result)
                                setSecurityZones(result['Security']); 
                                setAutomationZones(result['Automation']); 
                            })
        }
    
        props.getChangeTimesForDevices('detectionState',allzones).then(result => setChangeTimes(result))
    }, []);


    function toggleFilter(event) {
        if (filter=='DETECTED') {
            setFilter({ filter:'all'})
        } else {
            setFilter({ filter:'DETECTED'}) 
        }
    }
    
    function filterByType(zonetype) {
        var typezones=[]
        for (var j = 0; j < allzones.length; j++) {
            if (zonetype.includes(allzones[j].friendlyName)) {
                typezones.push(allzones[j])
            }
        }
        return typezones
            
    }
    
    function historyZone(name, endpointId) {
        props.applyBackPage('ZoneLayout', {} )
        props.applyLayoutCard('HistoryLayout', {"name": name, "endpointId": endpointId, "property":"detectionState"})
    }

    return (    
        <React.Fragment>
            <GridSection name={"Security Zones"} >
                { filterByType(securityZones).map((device) =>
                    <Zone history={historyZone} key={ device.endpointId } endpointId={ device.endpointId } name={ device.friendlyName } device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"} deviceProperties={ props.deviceProperties[device.endpointId] } />
                )}
            </GridSection>
            <GridSection name={"Automation Zones"} >
                { filterByType(automationZones).map((device) =>
                    <Zone history={historyZone} key={ device.endpointId } endpointId={ device.endpointId } name={ device.friendlyName } device={ device } changeTime={(changeTimes && (device.endpointId in changeTimes)) ? changeTimes[device.endpointId].time : "Unknown"} deviceProperties={ props.deviceProperties[device.endpointId] } />
                )}
            </GridSection>
        </React.Fragment>
    )

};

export default withData(withLayout(ZoneLayout));