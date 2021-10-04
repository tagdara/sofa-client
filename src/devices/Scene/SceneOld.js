import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListIcon from '@material-ui/icons/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';

import ListItemText from '@material-ui/core/ListItemText';
import ToggleAvatar from 'components/ToggleAvatar';
import GridItem from "components/GridItem"
import CircularProgress from '@material-ui/core/CircularProgress';

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


