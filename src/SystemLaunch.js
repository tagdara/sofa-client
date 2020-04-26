import React from 'react';
import { makeStyles, withTheme } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => {
    return {   
        iconRow: {
            padding: 16,
        },
        summaryButton: {
            width: 40,
            height: 40,
            padding: 8,
            marginRight: 8,
            color: theme.palette.primary.contrastText,
        },
        icon: {
            fontSize: 18,
            marginRight: 0,
        },
    }
});

export function SystemLaunch(props) {

    const classes = useStyles();

    return (
        <>
            <div className={classes.iconRow}>
            <IconButton size={"small"} className={classes.summaryButton}
                style={{'backgroundColor': props.theme.palette.avatar['off']}}>
                <SettingsIcon className={classes.icon} />
            </IconButton>
            </div>
        </>
    )
}

export default withTheme(SystemLaunch)