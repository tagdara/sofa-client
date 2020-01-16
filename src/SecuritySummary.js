import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles(theme => {
    return {        
        mid: {
            width: 96,
            color: "#558B2F",
            borderColor: "#558B2F",
            '&:hover': {
                backgroundColor: "#DCEDC8",
                borderColor: "#558B2F",
            }
                
        },
        hot: {
            width: 96,
            color: "#E65100",
            borderColor: "#E65100",
            '&:hover': {
                backgroundColor: "#FFE0B2",
                borderColor: "#E65100",
            }
        },
        iconPad: {
            marginRight: 8,
        }
    }
});

export default function SecuritySummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { devicesByController } = useContext(DataContext);

    const classes = useStyles();
    const allzones = devicesByController(['ContactSensor','MotionSensor'])
    const zoneOpen = zoneCount('DETECTED')>0;

    function zoneCount(condition) {
        var count=0;
        getSecurityZones().map(zone => {
            var controller=null
            if (zone.hasOwnProperty('ContactSensor')) {
                controller=zone.ContactSensor
            } else if (zone.hasOwnProperty('MotionSensor')) {
                controller=zone.MotionSensor
            } 
            if (controller && (condition==='all' || controller.detectionState.value===condition.toUpperCase())) {
                count=count+1
            }
            return ''
        })
        return count
    }
    
    function getSecurityZones() {
        var secZones=[]
        if (allzones===undefined) return []
        for (var i = 0; i < allzones.length; i++) {
            if (!allzones[i].description.includes('(Automation)')) {
                secZones.push(allzones[i])
            } 
        }
        return secZones
    }

    function secColor(count) {
        if (count>0) { return classes.hot }
        return classes.mid;
    }

    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ secColor(zoneOpen) } onClick={ () => applyLayoutCard('ZoneLayout') }>
                { zoneOpen ? <PriorityHighIcon className={classes.iconPad} /> : <VerifiedUserIcon/> }
                { zoneOpen ? zoneCount('DETECTED') : "" }
            </Button>
        </GridItem>
    );
}

