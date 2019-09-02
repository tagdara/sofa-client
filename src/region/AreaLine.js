import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withData } from '../DataContext/withData';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DotLevel from '../DotLevel';

const useStyles = makeStyles({
    
    halves: {
        flexGrow: 1,
        flexBasis: 1,
        boxSizing: "border-box",
    },
});

function AreaLine(props) {
    
    const classes = useStyles();

    function runShortcut(level) {
        var scene=props.deviceByEndpointId(props.area.AreaController.shortcuts.value[level])
        scene.SceneController.directive('Activate')
        //props.sendAlexaCommand('', props.device.AreaController.shortcuts.value[level], "SceneController", "Activate")
    }
    
    function currentLevel() {
        if (props.area.AreaController.shortcuts.value.includes(props.area.AreaController.scene.value)) {
            return props.area.AreaController.shortcuts.value.indexOf(props.area.AreaController.scene.value)
        }
        return 0
    }

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.area.friendlyName)}>{props.area.friendlyName} </ListItemText>
            { props.area.AreaController.shortcuts.value.length>0 &&
                <ListItemSecondaryAction>
                    <DotLevel half={true} level={currentLevel()} select={runShortcut} />
                </ListItemSecondaryAction>
            }
        </ListItem>
    );
}

export default withData(AreaLine)