import React, { useEffect } from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { deviceStatesAreEqual, dataFilter } from 'DataContext/DataFilter'

const MemoHero = React.memo(props => {
 
    useEffect(() => {
        props.addEndpointIds('id','hue:lights:28')
        props.addEndpointIds('category','SPEAKER')
    // eslint-disable-next-line 
    }, [])

    console.log('dv-ds', props.deviceState)

    return (
        <Card>
            <Typography>TEST</Typography>
        </Card>

    );
}, deviceStatesAreEqual);

export default dataFilter(MemoHero);
