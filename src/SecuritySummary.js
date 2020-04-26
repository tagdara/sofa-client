import React, { useContext } from 'react';
import { makeStyles, withTheme } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles(theme => {
    return {        
        iconRow: {
            padding: 16,
        },
        summaryButton: {
            width: 40,
            height: 40,
            padding: 8,
            marginRight: 8,
            color: theme.palette.primary.contrastText,
        },
        iconPad: {
            fontSize: 18,
            marginRight: 0,
        },
        count: {
            fontSize: 12,
        },
        mid: {
            color: "#558B2F",
            borderColor: "#558B2F",
            '&:hover': {
                backgroundColor: "#DCEDC8",
                borderColor: "#558B2F",
            }
                
        },
        hot: {
            color: "#E65100",
            borderColor: "#E65100",
            '&:hover': {
                backgroundColor: "#FFE0B2",
                borderColor: "#E65100",
            }
        },
    }
});

export function SecuritySummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStatesByController } = useContext(DataContext);

    const classes = useStyles();
    const allzones = deviceStatesByController(['ContactSensor','MotionSensor'])
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

    return (
        <div className={classes.iconRow}>
            <IconButton size={"small"} className={classes.summaryButton}
                style={{'backgroundColor': props.theme.palette.avatar[zoneOpen ? 'hot' : 'mid']}}
                    onClick={ () => applyLayoutCard('ZoneLayout') }>
                { zoneOpen ? <PriorityHighIcon className={classes.iconPad} /> : <VerifiedUserIcon className={classes.iconPad} /> }
                { zoneOpen &&
                    <Typography className={classes.count}>
                        {zoneCount('DETECTED') }
                    </Typography>
                }
            </IconButton>
        </div>
    );
}

export default withTheme(SecuritySummary)
