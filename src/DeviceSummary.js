import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

const useStyles = makeStyles({
        
    topSplit: {
        paddingBottom: 24,
    },
    summaryButton: {
        width: 96,
    },
    iconPad: {
        marginRight: 8,
    }
});

function DeviceSummary(props) {
    
    const classes = useStyles();
    const [onCount, setOnCount] = useState(0)
    
    useEffect(() => {
        var ondevs=0
        var devs=props.devicesByCategory('SWITCH')
        for (var i = 0; i < devs.length; i++) {
            if (devs[i].hasOwnProperty('PowerController') && devs[i].PowerController.powerState.value=='ON') {
                ondevs+=1
            }
        }
        setOnCount(ondevs)
    }, [props.devices])
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={classes.summaryButton} color={onCount ? "primary" : "default"} onClick={ () => props.applyLayoutCard('MoreDevicesLayout') }>
                <DevicesOtherIcon className={classes.iconPad} />
                {onCount ? "   "+onCount : " Off" }
            </Button>
        </GridItem>
    );
}

export default withData(withLayout(DeviceSummary));
