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
    const { deviceStateByEndpointId, directive } = useContext(DataContext);

    function runShortcut(level) {
        var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
        directive(scene.endpointId, 'SceneController', 'Activate')
    }
    
    function currentLevel() {
        if (props.area.AreaController.shortcuts.value.includes(props.area.AreaController.scene.value)) {
            return props.area.AreaController.shortcuts.value.indexOf(props.area.AreaController.scene.value)
        }
        return 0
    }
    
    function hasShortcuts() {
        try {
            if (props.area.AreaController.shortcuts.value.length>0) {
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
            <ListItemText className={classes.halves} onClick={ () => props.selectArea(props.area.friendlyName)}>{props.area.friendlyName} </ListItemText>
            { hasShortcuts() &&
                <DotLevel half={true} level={currentLevel()} select={runShortcut} />
            }
        </ListItem>
    );
}