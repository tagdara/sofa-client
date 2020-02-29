import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

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

export default function DeviceSummary(props) {
    
    const classes = useStyles();
    const [onCount, setOnCount] = useState(0)
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { deviceStatesByCategory } = useContext(DataContext);
    const switches = deviceStatesByCategory('SWITCH')
    
    useEffect(() => {
        var ondevs=0
        for (var i = 0; i < switches.length; i++) {
            if (switches[i].hasOwnProperty('PowerController') && switches[i].PowerController.powerState.value==='ON') {
                ondevs+=1
            }
        }
        setOnCount(ondevs)
    }, [switches])
    
    return (
        <GridItem wide={false} nopaper={true}>
            <Button variant="outlined" className={classes.summaryButton} color={onCount ? "primary" : "default"} onClick={ () => applyLayoutCard('MoreDevicesLayout') }>
                <DevicesOtherIcon className={classes.iconPad} />
                {onCount ? "   "+onCount : " Off" }
            </Button>
        </GridItem>
    );
}

