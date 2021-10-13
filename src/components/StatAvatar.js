import React from 'react';
import { makeStyles, withStyles} from '@material-ui/styles';

import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';
const useStyles = makeStyles(theme => {
    
    return {
        flex: {
            display: "flex",
            alignItems: "center",
            zIndex: 6,
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
        avatar: {
            justifyContent: "left",
            padding: 4,
            width: 64,
        },
        avatarRoot: {
            borderRadius: 8,
        },
        none: {
            color: theme.palette.primary.dark,
            padding: "0 8px",
            fontSize: 20,
        },
        chipPad: {
            paddingRight: 16,
        }
    }

});

const StyledBadge = withStyles((theme) => ({
    badge: {
      top: 20,
      right: 8,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      fontSize: 12,
    },
  }))(Badge);

const StatAvatar = props => {

    const classes = useStyles();

    return  (
        <StyledBadge badgeContent={4} color="primary">
            <Avatar className={ classes.avatar } onClick={props.onClick} classes={{ root: classes.avatarRoot }}>
                <LightbulbOutlineIcon />
            </Avatar>
        </StyledBadge>
    )

}

export default StatAvatar;

