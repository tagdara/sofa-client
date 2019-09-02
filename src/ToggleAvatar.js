import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => {
    
    return {
        off: {
            color: theme.palette.primary.contrastText,    
        },
        on: {
            color: theme.palette.primary.contrastText,
            background: theme.palette.primary.main,
        },
        notready: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#bbb",
        },
        closed: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#6a6",
        },
        open: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#e66",
        },
        cool: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#00796B"
        },
        mid: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#558B2F"
        },
        hot: {
            color: theme.palette.primary.contrastText,
            backgroundColor: "#E65100"
        },
        none: {
            color: theme.palette.primary.dark,
            padding: "0 8px",
            fontSize: 20,
        }   
    }
});

const useIconStyles = makeStyles(theme => {
    
    return {
        normal: {
            color: theme.palette.primary.main,
        },
        off: {
            color: theme.palette.text.disabled,    
        },
        on: {
            color: theme.palette.primary.main,
        },
        notready: {
            color: "#bbb",
        },
        closed: {
            color: "#6a6",
        },
        open: {
            color: "#e66",
        },
        cool: {
            color: "#00796B"
        },
        mid: {
            color: "#558B2F"
        },
        hot: {
            color: "#E65100"
        },
        base: {
            padding: "0 8px",
            fontSize: 20,
        }   
    }
});
export default function ToggleAvatar(props) {

    const classes = useStyles();
    const iconClasses = useIconStyles();
    const avclass = classes[props.avatarState];
    
    return (
        <ListItemAvatar onClick={props.onClick} className={ props.noback ?  classNames(iconClasses.base, iconClasses[props.avatarState]) : ''}>
            { props.noback ?
                <>
                    {props.children}
                </>
            :
                <Avatar className={ avclass} onClick={props.onClick}>
                    {props.children}
                </Avatar>
            }
        </ListItemAvatar>

    )

}

