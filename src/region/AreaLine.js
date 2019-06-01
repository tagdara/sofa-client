import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

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

export default function AreaLine(props) {
    
    const classes = useStyles();

    function runShortcut(level) {
        props.sendAlexaCommand('', props.areaData.shortcuts[level], "SceneController", "Activate")
    }
    
    function currentLevel() {
        if (props.areaData.shortcuts.includes(props.areaData.scene)) {
            return props.areaData.shortcuts.indexOf(props.areaData.scene)
        }
        return 0
    }

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.name)}>{props.name} </ListItemText>
            { props.areaData.shortcuts.length>0 &&
                <ListItemSecondaryAction>
                    <DotLevel theme={props.theme} half={true} level={currentLevel()} select={runShortcut} />
                </ListItemSecondaryAction>
            }
        </ListItem>
    );
}

