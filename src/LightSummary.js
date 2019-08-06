import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import LightbulbOutlineIcon from './LightbulbOutline';
import Button from '@material-ui/core/Button';
import GridItem from './GridItem';

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

function LightSummary(props) {
    
    const lightsOn = props.lightCount('on');
    const classes = useStyles();

    return (
        <GridItem wide={false} nopaper={true}>
            { props.lightCount('all') ?
                <Button variant="outlined" className={classes.summaryButton} color={lightsOn ? "primary" : "default"} onClick={ () => props.applyLayoutCard('LightLayout') }>
                    <LightbulbOutlineIcon className={classes.iconPad} />
                    {lightsOn ? " "+lightsOn : " Off" }
                </Button>
            :
                <Button variant="outlined" disabled className={classes.summaryButton} onClick={ () => props.applyLayoutCard('LightLayout') }>
                    <LightbulbOutlineIcon className={classes.iconPad} />
                    --
                </Button>

            }
        </GridItem>
    );
}

export default withData(withLayout(LightSummary));
