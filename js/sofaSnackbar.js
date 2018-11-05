import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
        
    snackBar: {
        marginBottom: "env(safe-area-inset-bottom)",
    },

});


class SofaSnackbar extends React.Component {
    
    render() {

        const { classes, message, open, close, duration } = this.props;

        return (
            <Snackbar
                className={classes.snackbar}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={open}
                onClose={close}
                autoHideDuration={duration}
                message={<span id="snackbar">{message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={close}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }
}

SofaSnackbar.defaultProps = {
    duration: 10000,
}

SofaSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SofaSnackbar);

