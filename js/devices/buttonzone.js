import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TuneIcon from '@material-ui/icons/Tune';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import PinDialog from './pinDialog';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LockOpenIcon from '@material-ui/icons/LockOpen';


const styles = theme => ({
        
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        justifyContent: "space-between",
        padding: "16",
    },
    buttonname: {
        flexGrow:2,
        paddingLeft:16,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    avatar: {
        color: '#fff',
        backgroundColor: deepOrange[200],
    },
    snackBar: {
        marginBottom: "env(safe-area-inset-bottom)",
    }
    
});

    const filterShouldRender = filter => element => elseElement => {
        if (filter==undefined || filter=='open') return element;
            return elseElement;
    }


class ButtonZone extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showPinPad: false,
            pinDevices: ['Garage Door Btn','Front Gate Btn','Garage Door'],
            pinCode: '8888',
            showSnackBar: false,
        }
    }
    
    sendPress = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/ButtonController/pressState", "command":"Press", "value":true}
        this.props.sendMessage(JSON.stringify(ops));
    }
    
    handlePress = event => {
        
        if ( this.state.pinDevices.indexOf(this.props.name) > -1) {
            this.setState({showPinPad:true})
        } else {
            this.sendPress()
        }
    }; 
    
    submitPin = pin => {

        this.setState({ showPinPad: false });
        if (pin==this.state.pinCode) {
            this.sendPress()
        } else {
            this.setState({ showSnackBar: true})
        }
    }
    
    handleSnackBarClose = event => {
        this.setState({ showSnackBar: false})
    }
    
    
    closeDialog = () => {
        this.setState({ showPinPad: false });
    };    

    
    render() {

        const { classes } = this.props;


        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Avatar className={classes.avatar} onClick={ () => this.handlePress(true) }><Icon>{this.props.icon}</Icon></Avatar>
                        <Typography className={classes.buttonname}>{this.props.name}</Typography>
                        { this.props.zoneProperties.hasOwnProperty(this.props.name) ?
                        <Typography variant="body2">{this.props.zoneProperties[this.props.name].position}</Typography>
                        : null
                        }
                    </CardContent>
                    { this.state.pinDevices.indexOf(this.props.name) > -1 ?
                    <PinDialog submitPin={this.submitPin} showPinPad={this.state.showPinPad} unlocker={ this.handlePinPress } closeDialog={ this.closeDialog }/>
                    : null}
                    { this.state.pinDevices.indexOf(this.props.name) > -1 ?
                    <Snackbar
                        className={classes.snackbar}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.showSnackBar}
                        autoHideDuration={10000}
                        onClose={this.handleSnackBarClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Invalid PIN</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleSnackBarClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    : null}
                </Card>
        );
    }
}

ButtonZone.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonZone);

