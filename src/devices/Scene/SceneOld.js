import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListIcon from '@mui/icons-material/List';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';

import ListItemText from '@mui/material/ListItemText';
import ToggleAvatar from 'components/ToggleAvatar';
import GridItem from "components/GridItem"
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles({
    
    root: {
        minHeight: 72,
        display: "flex",
        width: "100%",
    },
    listItem: {
        padding: "8 24px",
    },
    working: {
        marginLeft: 4,
    },
    padLabel: {
        paddingLeft: 28,
    },
    sceneRow: {
        minHeight: 54,
    }
});


export default function Scene(props) {
    
    const classes = useStyles();
    const [working, setWorking] = useState(false)
    
    useEffect(() => {
        setWorking(false)
    }, [props.computedLevel]);
    
    function runScene() {
        console.log('Activating', props.scene.friendlyName)
        setWorking(true)
        props.directive(props.scene.endpointId, 'SceneController', 'Activate')
    }
    
    function deleteScene(endpointId) {
        props.directive(props.scene.endpointId, 'SceneController', 'Delete')
    }

    var SceneObject =  (
        <ListItem className={classes.sceneRow} onClick={ () => runScene()}>
            { working ?
                <CircularProgress size={props.small ? 24 : 32} className={classes.working} />
            :
                <ToggleAvatar avatarState={props.scene.endpointId===props.computedLevel ? 'on' : 'off'} small={props.small} >
                    {props.shortcut==='x' ? <ListIcon /> : props.shortcut }
                </ToggleAvatar>
            }
            <ListItemText className={props.small && classes.padLabel} >{props.scene.friendlyName}</ListItemText>
            { props.remove &&
                <ListItemSecondaryAction className={classes.listItem}>
                    <ListItemIcon onClick={() => deleteScene() }><CloseIcon /></ListItemIcon>   
                </ListItemSecondaryAction>
            }
        </ListItem>
    )

    return (
        <>
        { !props.noGrid ?
            <GridItem nopaper={props.nopaper} xs={props.xs} thinmargin={props.thinmargin} flex={true} inset={props.inset} nolist={true} noMargin={props.noMargin} >
                { SceneObject }
            </GridItem>
            :
            <> { SceneObject } </>
        }
        </>
    )    

};


