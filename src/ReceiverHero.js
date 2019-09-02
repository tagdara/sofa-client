import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Receiver from './devices/receiver';

function ReceiverHero(props) {

    return (
        <React.Fragment>
            { props.devices.map((device) => (
                <Receiver wide={props.wide} key={device.endpointId} device={ device } />
                ))
            }
        </React.Fragment> 
    );
    
}

export default withData(ReceiverHero);
