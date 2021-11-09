import React from 'react';
import { makeStyles } from '@mui/styles';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ToggleAvatar from 'components/ToggleAvatar'
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(theme => {
    return {        
        xlistItemNoPad: {
            boxSizing: "border-box",
            padding: 0,
            height: 56,
            minHeight: 56,
        },
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
        },
        primary: {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
        },
        flex: {
            display: "flex",
            flexGrow: 1,
            width: "100%",
            flexWrap: "wrap",
            flexDirection: "column",
            minHeight: 41,
            maxHeight: 41,
            justifyContent: "center",
            margin: 0,
        }
    }
});

export default function SofaListItem(props) {
    
    const classes = useStyles();

    function handleAvatarClick(e) {
        console.log('avatar click')
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
                <>
                { props.loading ?
                    <CircularProgress style={{ marginRight: 16 }} size={36} />
                :
                    <ToggleAvatar wideAvatar={props.wideAvatar} avatarState={ props.avatarState } noback={!props.avatarBackground} onClick={ (e) => handleAvatarClick(e) } >
                        { props.avatar }
                    </ToggleAvatar>
                }
                </>
            }
            <ListItemText onClick={ props.avatarClick ? props.onClick : null } classes={{ root: classes.flex, primary: classes.primary, secondary : classes.smallSecondary }} primary={ props.primary } secondary={ props.secondary } />
            { props.secondaryActions && 
                <>
                {props.inlineSecondary ?
                    <>
                        { props.secondaryActions }
                    </>
                :
                    <ListItemSecondaryAction>
                        { props.secondaryActions }
                    </ListItemSecondaryAction>
                }
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


