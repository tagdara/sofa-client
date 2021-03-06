import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { DataContext } from './DataContext/DataProvider';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DotLevel from './DotLevel';
import AreaColor from './AreaColor';


const useStyles = makeStyles(theme => {
    return {        
        dialogActions: {
            paddingBottom: "env(safe-area-inset-bottom)",
        },
        listDialogContent: {
            padding: 0,
        },
        button: {
            minWidth: 36
        },
        buttonspacer: {
            minWidth: 36,
            marginRight: 18
        },
        halves: {
            flexGrow: 1,
            flexBasis: 1,
            boxSizing: "border-box",
        },
        dotLine: {
            display: "flex",
            justifyContent: "space-between",
            padding: 8,
            alignItems: "center",
            height: 64,
            boxSizing: "border-box",
        },
        noLabel: {
            display: "flex",
            justifyContent: "center",
            padding: 8,
            alignItems: "center",
            height: 54,
            boxSizing: "border-box",
        },
        dotLabel: {
            height: 48,
            maxWidth: "50%",
            flexGrow:1,
            padding: 8,
            boxSizing: "border-box",
            alignItems: "center",
            display: "flex",
        },
        dotClickLabel: {
            height: 48,
            maxWidth: "50%",
            flexGrow:1,
            '&:hover': {
                backgroundColor: theme.palette.background.hover,
            },
            borderRadius:4,
            padding: 8,
            boxSizing: "border-box",
            alignItems: "center",
            display: "flex",
        },

        details: {
            display: "flex",
            flexDirection: "column",
            padding: 0,
        },
        paper: {
            display: "flex",
            flexDirection: "column",
            flexGrow: 0,
            width: "100%",
        }
    }
});

export default function AreaSummaryLine(props) {

    const classes = useStyles();
    const { directive } = useContext(DataContext);
    //const area = deviceStateByEndpointId('logic:area:'+layout.props.name)

    function runShortcut(level) {
        //var scene=deviceStateByEndpointId(props.area.AreaController.shortcuts.value[level])
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
            <ListItem className={props.showLabel ? classes.dotLine : classes.noLabel}>
                {props.showLabel &&
                    <ListItemText className={props.clickName ? classes.dotClickLabel : classes.dotLabel} onClick={props.clickName}>
                        {props.device.friendlyName}
                    </ListItemText>
                }
                { hasShortcuts() &&
                    <DotLevel level={currentLevel()} select={runShortcut} />
                }
                { props.colorLights &&
                    <AreaColor directive={directive} colorLights={props.colorLights} />
                }
            </ListItem>

    )

};