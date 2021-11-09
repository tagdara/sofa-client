import React from 'react';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';

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


