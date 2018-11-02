import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Slide from  '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    dialogTitle: {
        backgroundColor: theme.palette.primary.dark,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        minHeight: 36,
        paddingTop: "env(safe-area-inset-top)",
    },
    dialogTitleText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
        height: 36,
    },
    smallBar: {
        padding:0,
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: theme.palette.primary.dark,
    },
    bigBar: {
        padding:0,
        paddingTop: "env(safe-area-inset-top)",
        backgroundColor: theme.palette.primary.dark,
    },
    titleBar: {
        height: 36,
        minHeight: 36,
    },
    tabBar: {
        height: 48,
        minHeight: 48,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    }

});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class SofaDialog extends React.Component {
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={this.props.maxWidth}
                open={this.props.open}  
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={classes.dialog}
            >
                    <DialogTitle className={this.props.tabs ? classes.bigBar: classes.smallBar}>
                        <Toolbar elevation={0} className={classes.titleBar}>
                            <Typography variant="subheading" className={classes.dialogTitleText}>
                                {this.props.title}
                            </Typography>
                        </Toolbar>
                        {this.props.tabs ?
                        <Toolbar elevation={0} className={classes.tabBar} >    
                            {this.props.tabs}
                        </Toolbar>
                        : null }
                    </DialogTitle>

                {this.props.children}
            </Dialog>
        )
    }

}

SofaDialog.defaultProps = {
    maxWidth: 'sm',
    tabs: '',
}

SofaDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SofaDialog));
