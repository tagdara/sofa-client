import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import ListItemAvatar from 'components/ListItemAvatar';

const useStyles = makeStyles(theme => {
    return {        
        listItemNoPad: {
            cursor: "pointer",
            boxSizing: "content-box",
            //boxSizing: "border-box",
            padding: "0 16px",
            height: 56,
            minHeight: 56,
            display: "flex",
            flexGrow: 1,
            overflow: "hidden",
            borderRadius: 8,
        },
        listItem: {
            cursor: "pointer",
            boxSizing: "content-box",
            //boxSizing: "border-box",
            //height: 72,
            minHeight: 56,
            padding: "8px 16px"
        },
        smallSecondary: {
            fontSize: 12,
            flexGrow: 1,
            display: "flex",
        },
        primary: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            flexGrow: "1",
        },
        flex: {
            display: "flex",
            flexGrow: 1,
            width: "100%",
            flexDirection: "column",
            //minHeight: 41,
            //maxHeight: 41,
            justifyContent: "center",
            margin: 0,
            alignItems: "flex-start"
        },
        lisa: {
            display: "flex",
            alignItems: "flex-end",
        }
    }
});

export default function SofaListItem(props) {
    
    const classes = useStyles();

    function handleAvatarClick(e) {
        e.stopPropagation(); 
        if (props.avatarClick) {
            props.avatarClick()
        } else if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <ListItem component={"div"} className={ (props.inList || props.noPad) ? classes.listItemNoPad : classes.listItem } button={props.button} onClick={ props.avatarClick ? null : props.onClick }>
            { props.avatar &&
                <ListItemAvatar avatar={props.avatar} small={props.smallAvatar} wide={props.wideAvatar} state={props.avatarState} noBackground={!props.avatarBackground} onClick={(e) => handleAvatarClick(e) } />
            }
            <ListItemText   onClick={ props.labelClick ? props.labelClick : null } classes={{ root: classes.flex, primary: classes.primary, secondary : classes.smallSecondary }} 
                            primary={ props.primary } secondary={ props.secondary } />
            { props.secondaryActions && 
                <>
                {props.inlineSecondary ?
                    <>
                        { props.secondaryActions }
                    </>
                :
                    <ListItemSecondaryAction className={classes.lisa} >
                        { props.secondaryActions }
                    </ListItemSecondaryAction>
                }
                </>
            }
            { props.children &&
            <>
                { props.children}
            </>
            }
        </ListItem>
    );
}

SofaListItem.defaultProps = {
    avatarState: "off",
    button: false,
    avatarBackground: true,
    inlineSecondary: true,
    wideAvatar: false,
}


