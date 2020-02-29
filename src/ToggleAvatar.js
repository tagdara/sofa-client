import React from 'react';
import { makeStyles, withTheme } from '@material-ui/styles';
import classNames from 'classnames';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => {
    
    return {
        base: {
            padding: 0,
            minWidth: 56,
        },
        reverse: {
            justifyContent: "flex-end",
            display: "flex",
        },
        sizeSmall: {
            minWidth: 36,
            fontSize: 10,
        },
        avatarSmall: {
            height: 28,
            width: 28,
            fontSize: 14,
        },
        none: {
            color: theme.palette.primary.dark,
            padding: "0 8px",
            fontSize: 20,
        } 
    }

});



function ToggleAvatar(props) {

    const classes = useStyles();

    const styles = {
        back: {
            backgroundColor: props.theme.palette.avatar[props.avatarState],
            color: props.theme.palette.primary.contrastText,
            },
        noback: {
            color: props.theme.palette.avatar[props.avatarState]
        },
        none: {}
    };
    
    return (
        <ListItemAvatar style={props.noback ? styles.noback : styles.none } onClick={props.onClick} className={ classNames(props.small ? classes.sizeSmall : classes.base, props.reverse && classes.reverse )}>
            { props.noback ?
                <>
                    {props.children}
                </>
            :
                <Avatar style={styles.back} className={ classNames(props.small && classes.avatarSmall) } onClick={props.onClick} >
                    {props.children}
                </Avatar>
            }
        </ListItemAvatar>

    )

}

ToggleAvatar.defaultProps = {
    reverse: false,
    noback: false,
    small: false,
}

export default withTheme(ToggleAvatar)

