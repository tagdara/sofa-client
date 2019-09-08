import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

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

export default function LightSummary(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    const { lightCount } = useContext(DataContext);

    const lightsOn = lightCount('on');
    const classes = useStyles();

    return (
        <GridItem wide={false} nopaper={true}>
            { lightCount('all') ?
                <Button variant="outlined" className={classes.summaryButton} color={lightsOn ? "primary" : "default"} onClick={ () => applyLayoutCard('LightLayout') }>
                    <LightbulbOutlineIcon className={classes.iconPad} />
                    {lightsOn ? " "+lightsOn : " Off" }
                </Button>
            :
                <Button variant="outlined" disabled className={classes.summaryButton} onClick={ () => applyLayoutCard('LightLayout') }>
                    <LightbulbOutlineIcon className={classes.iconPad} />
                    --
                </Button>

            }
        </GridItem>
    );
}
