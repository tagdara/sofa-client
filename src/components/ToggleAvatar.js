import React from 'react';
import { makeStyles, withTheme } from '@mui/styles';
import classNames from 'classnames';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

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
        wideChip: {
            height: 40,
            fontSize: 20,
            borderRadius: 20,
            fontWeight: 400,
        },
        chipLabel: {
            fontWeight: 400,
            padding: '0px 10px',
        },
        smallChip: {
            height: 28,
            fontSize: 14,
            borderRadius: 14,
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
        },
        xchipPad: {
            paddingRight: 16,
        }
    }

});



function ToggleAvatar(props) {

    const classes = useStyles();

    const styles = {
        back: {
            // deprecated - use ColorAvatar and pass colors directly
            //backgroundColor: props.theme.palette.avatar[props.avatarState.toLowerCase()],
            },
        noback: {
            padding: 8,
            //backgroundColor: props.theme.palette.avatar.none,
            // deprecated - use ColorAvatar and pass colors directly
            //color: props.theme.palette.avatar[props.avatarState.toLowerCase()]
        },
    };

    return  (
        <ListItemAvatar onClick={props.onClick} className={ classNames(classes.flex, props.small ? classes.sizeSmall : classes.base, props.reverse && classes.reverse )}>
            { props.wideAvatar ?
            <div className={!props.reverse ? classes.chipPad : null} >
            <Chip   classes={{ label: classes.chipLabel }} style={props.noback ? styles.noback : styles.back} className={ classNames(classes.wideChip, props.small && classes.smallChip) } 
                    onClick={props.onClick} label={props.children} color="secondary" />
            </div>
            :
            <Avatar style={props.noback ? styles.noback : styles.back} className={ classNames(props.small && classes.avatarSmall) } onClick={props.onClick} >
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
    avatarState: "off",
}

export default withTheme(ToggleAvatar)

