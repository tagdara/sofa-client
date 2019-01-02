import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Region from './Region';
import LayersIcon from '@material-ui/icons/Layers';

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
    const [regions, setRegionList] = useState({});
    
    useEffect(() => {
        fetch('/list/logic/regions')
            .then(result=>result.json())
            .then(data=>setRegionList(data))
    }, []);
    
    function setRegionLayout(name) {
        props.setRegion(name);
        console.log('Setting layout to Home')
        props.setLayout('Home');
    }

    return (    
        <React.Fragment>
            <GridBreak label={"Regions"} />
            { Object.keys(regions).map((region) =>
                <Region key={ region } setRegion={setRegionLayout} setLayoutCard={props.setLayoutCard} current={ props.region==region } name={ region } />
            )}
        </React.Fragment>
    )

};

export default withData(RegionsLayout);