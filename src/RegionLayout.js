import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from './DataContext/withData';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import GridBreak from './GridBreak';
import Area from './Area';


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

function RegionLayout(props) {

    const classes = useStyles();
    const isMobile = window.innerWidth <= 800;
    const [region, setRegion] = useState({'areas':{}});
    const [areas, setAreas] = useState({});
    const [editMode, setEditMode] = useState(false);
    
    useEffect(() => {
        fetch('/list/logic/region/'+props.layoutProps.name)
            .then(result=>result.json())
            .then(data=>setRegion(data))
    }, []);
    
    function loadAllAreas() {
        fetch('/list/logic/areas')
            .then(result=>result.json())
            .then(data=>setAreas(data))
    }
    
    function toggleEditMode() {
        if (!editMode) {
            console.log('loading area data')
            loadAllAreas()
        }
        setEditMode(!editMode)
        if (editMode) {
            console.log('loading area data')
            loadAllAreas()
        }
    }
    
    function removeArea(name) {
        if (region.areas.hasOwnProperty(name)) {
            var newregion=region
            delete newregion.areas[name]
            setRegion(newregion)
        }
    }

    function addArea(name) {
        if (!region.areas.hasOwnProperty(name)) {
            if (areas.hasOwnProperty(name)) {
                var newregion=region
                newregion.areas[name]=areas[name]
                setRegion(newregion)
            }
        }
    }

    function viewArea(name) {
        props.setLayout('Area',{"name": name})
    }

    
    return (    
        <React.Fragment>
            <GridBreak label={props.layoutProps.name} >
                <Button onClick={ () => toggleEditMode()} color={ editMode ? "primary" : "default"} className={classes.button }>
                    Edit
                </Button>
            </GridBreak>
            { Object.keys(region.areas).sort().map((area) =>
                <Area key={ area } name={ area } current={true} mode={ editMode ? "remove" : "more"} removeArea={removeArea} viewArea={viewArea} />
            )}
            { editMode ? 
                <React.Fragment>
                    <GridBreak label={"Other Areas"} />
                    { Object.keys(areas).sort().map((area) =>
                        region.areas.hasOwnProperty(area) ? null : 
                        <Area key={ area } name={ area } mode={ editMode ? "add" : "more"} addArea={addArea} viewArea={viewArea} sendAlexaCommand={props.sendAlexaCommand} />
                    )}
                </React.Fragment>
            : null }
        </React.Fragment>
    )

};

export default withData(RegionLayout);