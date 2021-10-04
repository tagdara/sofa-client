import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { DataContext } from 'DataContext/DataProvider';

import DotLevel from 'components/DotLevel';


const useStyles = makeStyles({
    
    halves: {
        flexGrow: 1,
        flexBasis: 1,
        boxSizing: "border-box",
        cursor: "pointer",
    },
    areaListItem: {
        minHeight: 54,
        paddingRight: 8,
        paddingTop: 0,
        paddingBottom: 0,
    }
});

export default function AreaLine(props) {
    
    const classes = useStyles();
    const { directive } = useContext(DataContext);

    function runShortcut(level) {
        directive(props.deviceState.AreaController.shortcuts.value[level], 'SceneController', 'Activate')
    }
    
    function currentLevel() {
        if (props.deviceState.AreaController.shortcuts.value.includes(props.deviceState.AreaController.scene.value)) {
            return props.deviceState.AreaController.shortcuts.value.indexOf(props.deviceState.AreaController.scene.value)
        }
        return 0
    }
    
    function hasShortcuts() {
        try {
            if (props.deviceState.AreaController.shortcuts.value.length>0) {
                return true
            }
        }
        catch {
            return false
        }

        return false
    }

    return (
        <ListItem className={classes.areaListItem}>
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.device.friendlyName)}>{props.device.friendlyName} </ListItemText>
            { hasShortcuts() &&
                <DotLevel half={true} level={currentLevel()} select={runShortcut} />
            }
        </ListItem>
    );
}