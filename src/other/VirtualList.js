import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';

import { withData } from '../DataContext/withData';

import Shade from './Shade';
import Sprinkler from './Sprinkler';
import GridBreak from '../GridBreak';

function VirtualList(props) {

    return (
        props.virtualDevices ?
            <React.Fragment>
                <GridBreak label={"Shades"} />
                { Object.keys(props.virtualDevices).map((key, index) => (
                    props.virtualDevices[key]['type']=='shade' ?
                        <Shade key={ index } name={ key } endpointId={ props.virtualDevices[key].endpointId } commands={ props.virtualDevices[key].commands } sendAlexaCommand={props.sendAlexaCommand} />
                        :null
                ))}
                <GridBreak label={"Sprinklers"} />
                { Object.keys(props.virtualDevices).map((key, index) => (
                    props.virtualDevices[key]['type']=='water' ?
                        <Sprinkler key={ index } name={ key } commands={ props.virtualDevices[key].commands } sendAlexaCommand={props.sendAlexaCommand} />
                        :null
                ))}
            </React.Fragment>
        : null 
    );
}

export default withData(VirtualList);
