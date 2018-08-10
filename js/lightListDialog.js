import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Light from './devices/light';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Paper from '@material-ui/core/Paper';

const styles = {

    dialog: {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        minWidth: '320px',
        boxSizing: "border-box",
    },
    titleControls: {
        padding: 0,
    },
    titleContent: {
        padding: "16 24",
        minWidth: 0,
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },

    dialogContent: {
        padding: 0,
    },
    dialogcard: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    countLabel: {
        padding: "8 16",
    },
    off: {
        backgroundColor: "#777",
    },
    on: {
        backgroundColor: deepOrange[500],
    },    
}

class LightListDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showOverlay: true,
            showdialog: false,
            filter: 'on',
        }
    }
    
    toggleFilter = event => {
        if (this.state.filter=='on') {
            this.setState({ filter:'all'})
        } else {
            this.setState({ filter:'on'}) 
        }
    }   
    

    render() {

        const { classes, fullScreen } = this.props;

        return (
                <Dialog 
                    fullScreen={fullScreen}
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={this.props.showdialog}
                    onClose={() => this.props.closeDialog()}  
                    className={this.props.classes.dialog}
                    >
                    <DialogTitle elevation={1} disableTypography={true} className={classes.titleControls}>
                        <Paper className={classes.titleContent} onClick={ () => this.toggleFilter('all') } >
                            { this.props.lightCount('on')>0 ? 
                            <Avatar className={classes.on} ><LightbulbOutlineIcon/></Avatar>
                            : 
                            <Avatar className={classes.off} ><LightbulbOutlineIcon/></Avatar>
                            }
                            { this.props.lightCount('on')>0 ? 
                                <Typography className={classes.countLabel} variant="subheading">{this.props.lightCount('on')} lights are on</Typography>
                                : 
                                <Typography className={classes.countLabel} variant="subheading">All lights off</Typography>
                            }
                        </Paper>
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>
                        { 
                        this.props.devices.map((device) =>
                            this.state.filter=='all' || String(this.props.deviceProperties[device.friendlyName].powerState).toLowerCase()==this.state.filter.toLowerCase() ?
                            <Light key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />
                            : null
                        )}                    
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.props.closeDialog()} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

            : null
           
        );
    }
}

LightListDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(LightListDialog));
