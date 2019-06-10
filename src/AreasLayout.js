import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Region from './Region';
import LayersIcon from '@material-ui/icons/Layers';
import AreaLine from './region/AreaLine';
import GridItem from './GridItem';

const useStyles = makeStyles({
    
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listDialogContent: {
        padding: 0,
    },
    button: {
        minWidth: 36
    },
});

function RegionsLayout(props) {

    const classes = useStyles();
    console.log('aprops',props.devicesByCategory('AREA'))
    
    function selectArea(name) {
        props.setRegion(name);
        props.applyLayout('Home');
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Areas"} />
            { props.devicesByCategory('AREA').map((area) =>
            <GridItem wide={props.wide} key={ area.endpointId } >
                <AreaLine area={ area } name={ area.friendlyName } areaData={ props.deviceProperties[area.endpointId] } sendAlexaCommand={props.sendAlexaCommand} shortcuts={area.shortcuts} selectArea={selectArea} ></AreaLine>
            </GridItem>
            )}
        </React.Fragment>
    )

};

export default withLayout(withData(RegionsLayout));