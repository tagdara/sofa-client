import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLongPress } from 'use-long-press';

const useStyles = makeStyles(theme => {
    
    return {
        flex: {
            display: "flex",
            alignItems: "center",
            zIndex: 6,
            //padding: 8,
        },
        base: {
            padding: 0,
            minWidth: 56,
        },
        reverse: {
            justifyContent: "flex-end",
            display: "flex",
        },
        sizeSmall: {
            minWidth: 26,
            fontSize: 10,
        },
        none: {
            color: theme.palette.primary.dark,
            padding: "0 8px",
            fontSize: 20,
        },
        highlight: {
            color: theme.palette.primary.main,
        }
    }

});



const CardLineIcon = props => {

    const classes = useStyles();
    const color = (props.color && !["primary", "secondary"].includes(props.color)) ? props.color : undefined
    
    const styles = {
        back: {
            backgroundColor: props.color,
            },
        noback: {
            padding: 8,
            backgroundColor: "rgba(0,0,0,0)",
            color: props.color,
        },
        color: {
            color: props.color,
        }
    };

    const bind = useLongPress(() => {}, {
        onFinish: event => { event.stopPropagation(); event.preventDefault(); props.longPress() },
        threshold: 500,
        captureEvent: false,
        cancelOnMovement: false,
        detect: 'both',
    });

    if (props.loading) {
        return  <CircularProgress size={24} />
    }

    return  (
        <ListItemIcon onClick={props.onClick} styles={ color && styles.color } className={ props.color === "primary" ? classes.highlight : classes.normal} {...bind} >
            {props.children}
        </ListItemIcon>
    )
}

export default CardLineIcon

