import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import RoomIcon from '@mui/icons-material/Room';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

    function runShortcut(level) {
        directive(shortcuts[level], 'SceneController', 'Activate')
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


