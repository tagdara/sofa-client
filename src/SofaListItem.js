import React from 'react';
import { makeStyles } from '@material-ui/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ToggleAvatar from './ToggleAvatar'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => {
    return {        
        xlistItemNoPad: {
            boxSizing: "border-box",
            padding: 0,
            height: 56,
            minHeight: 56,
        },
        listItemNoPad: {
            boxSizing: "border-box",
            padding: "0 16px",
            height: 56,
            minHeight: 56,
            display: "flex",
            flexGrow: 1,
        },
        listItem: {
            boxSizing: "border-box",
            height: 72,
            minHeight: 72,
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
        <ListItem className={ (props.inList || props.noPad) ? classes.listItemNoPad : classes.listItem } button={props.button} onClick={ props.avatarClick ? null : props.onClick }>
            { props.avatar &&
                <>
                { props.loading ?
                    <CircularProgress style={{ marginRight: 16 }} size={36} />
                :
                    <ToggleAvatar avatarState={ props.avatarState } noback={!props.avatarBackground} onClick={ (e) => handleAvatarClick(e) } >
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
            { props.children}
        </ListItem>
    );
}

SofaListItem.defaultProps = {
    avatarState: "off",
    button: false,
    avatarBackground: true,
    inlineSecondary: true,
}


