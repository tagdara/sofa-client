import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Videocam from '@material-ui/icons/Videocam';

const useStyles = makeStyles(theme => {
    return {        
        cool: {
            width: 96,
            color: "#00796B",
            borderColor: "#00796B",
            '&:hover': {
                backgroundColor: "#B2DFDB",
                borderColor: "#00796B",
            }
        },
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
        
        base: {
            width: 96,
        },
        
        iconPad: {
            marginRight: 8,
        }
    }
});

function SecuritySummary(props) {
    
    const classes = useStyles();
    const zoneOpen = zoneCount('DETECTED')>0;
    const [filter, setFilter] = useState('open');
    const [securityZones, setSecurityZones] = useState([])
    const [automationZones, setAutomationZones] = useState([])
    
    useEffect(() => {
  	    fetch('/data/security')
 		    .then(result=>result.json())
            .then(result=>{ setSecurityZones(result['Security']); setAutomationZones(result['Automation']); })
    }, []);
    
    function secColor(count) {
        if (count>0) { return classes.hot }
        return classes.mid;
    }

    function zoneReady() {
        
        if (!securityZones || Object.keys(props.deviceProperties).length==0) {
            return false
        } else {
            for (var dev in props.deviceProperties) {
                if (props.deviceProperties[dev].detectionState==undefined) {
                    return false
                }
            }
        }
        return true
    }
    
    function zoneCount(condition) {
        var count=0;
        for (var dev in props.deviceProperties) {
            if (condition=='all' || props.deviceProperties[dev].detectionState==condition) {
                if (securityZones && securityZones.includes(dev)) {
                    count=count+1
                }
            }
        }
        return count
    }

    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={ secColor(zoneOpen) } onClick={ () => props.applyLayoutCard('ZoneLayout') }>
                { zoneOpen ? <PriorityHighIcon className={classes.iconPad} /> : <VerifiedUserIcon/> }
                { zoneOpen ? onCount : "" }
            </Button>
        </GridItem>
    );
}

export default withData(withLayout(SecuritySummary));
