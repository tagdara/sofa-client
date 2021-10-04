import React from 'react';
import { makeStyles } from '@material-ui/styles';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => {
    return {        
        snackBar: {
            marginBottom: "env(safe-area-inset-bottom)",
        },
    }
});

export default function SofaSnackbar(props) {
    
    const classes = useStyles();

    return (
        <Snackbar   className={classes.snackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right',}}
                    open={props.open} onClose={props.close} autoHideDuration={props.duration}
                    message={<span id="snackbar">{props.message}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={props.close}>
                            <CloseIcon />
                        </IconButton>,
                    ]}
        />
    );
}

SofaSnackbar.defaultProps = {
    duration: 10000,
}


