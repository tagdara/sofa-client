import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import RoomIcon from '@material-ui/icons/Room';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { DataContext } from 'DataContext/DataProvider';

import ToggleAvatar from 'components/ToggleAvatar';
import DotLevel from 'components/DotLevel';
import GridItem from 'components/GridItem'

const useStyles = makeStyles({
 
    root: {
        minHeight: 80,
        display: "flex",
        width: "100%",
    },
    iconSize: {
        height: 24,
        width: 24,
    },
    stack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    tile: {
        display: "flex",
        flexGrow: 1,
        height: 90,
        paddingRight: 8,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
    },
    nostack: {
        height: 44,
        display: "flex",
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        maxWidth: 480,
        minWidth: 240,
        boxSizing: "border-box",
        marginRight: 8,
    },
    lightSwitch: {
        marginLeft: 8,
    },
    listItem: {
        padding: "8px 16px 8px 16px",
    },
    lightbar: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    placeholder: {
        height: 57,
        width: "100%",
    },
    tinyIcon: {
        margin: 4,
        height: 8,
        width: 8,
    }
});

export default function Area(props) {
    
    const classes = useStyles();
    const { deviceByEndpointId } = useContext(DataContext);

    function runScene(sceneName) {
        deviceByEndpointId("logic:scene:"+sceneName).SceneController.directive("Activate")
    }

    function runShortcut(level) {
        if (props.shortcuts.hasOwnProperty(level.toString())) {
            runScene(props.shortcuts[level])
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }
        
    return (
        <GridItem wide={props.wide} >
            <ListItem className={classes.listItem}>
                <ToggleAvatar avatarState={props.current===true ? "on" : "off"} onClick={() => props.setArea(props.name) } >
                    <RoomIcon className={classes.iconSize} />
                </ToggleAvatar>
                <ListItemText onClick={() => props.setArea(props.name) } >{props.name}</ListItemText>
                { props.mode==="add" || props.mode==="remove" ? null :
                <DotLevel level={0} select={runShortcut} />
                }
                <IconButton>
                    { props.mode!=="add" ? null :
                    <AddIcon className={classes.iconSize} onClick={() => props.addArea(props.name) }/>
                    }
                    { props.mode!=="remove" ? null :
                    <RemoveIcon className={classes.iconSize} onClick={() => props.removeArea(props.name)}/>
                    }
                    { props.mode!=="more" ? null :
                    <MoreHorizIcon className={classes.iconSize} onClick={() => props.viewArea(props.name) }/>
                    }
                </IconButton>
            </ListItem>
        </GridItem>
        
    );
}


