import React, { useContext } from 'react';
import { DataContext } from './DataContext/DataProvider';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import DotLevel from './DotLevel';

const useStyles = makeStyles({
    
    halves: {
        flexGrow: 1,
        flexBasis: 1,
        boxSizing: "border-box",
    },
    areaListItem: {
        minHeight: 54,
        paddingRight: 8,
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