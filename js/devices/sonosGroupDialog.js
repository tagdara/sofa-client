import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SpeakerIcon from '@material-ui/icons/Speaker';


const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SonosGroupDialog extends React.Component {
    
    componentDidMount() {
        console.log(this.props)
    }
    
    handleCheckClick = (event,item) => {
        console.log(event,event.target.checked,item)
        if (event.target.checked) {
            var sonosinput=this.props.coordinator
        } else {
            var sonosinput=''
        }
        var ops={"op":"set", "path":"discovery/"+item+"/InputController/input", "command":"SetInput", "value":sonosinput }
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={this.props.open}  
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle className={classes.tabTitle}>

                        <Toolbar className={classes.appBar} elevation={0}>
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                                {this.props.coordinator}
                            </Typography>
                        </Toolbar>
          
                </DialogTitle>
                <Divider />
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.thermostatList} >
                        { 
                        this.props.devices.map((device) => (
                            <ListItem key={device.friendlyName} >
                                <ListItemIcon><SpeakerIcon /></ListItemIcon>
                                <ListItemText primary={device.friendlyName}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        checked={this.props.coordinator==device.friendlyName || this.props.linked.includes(device.friendlyName)}
                                        onClick={event => this.handleCheckClick(event, device.friendlyName)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                            
                        }
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }

}

SonosGroupDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(SonosGroupDialog));
