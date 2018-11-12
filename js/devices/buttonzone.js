import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TuneIcon from '@material-ui/icons/Tune';

import PinDialog from './pinDialog';
import SofaSnackbar from '../sofaSnackbar';


const styles = theme => ({
        
    card: {
        display: 'flex',
        maxWidth: '480px',
        flexGrow: 1,
        boxSizing: "border-box",
        justifyContent: "space-between",
        margin: 2,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    snackBar: {
        marginBottom: "env(safe-area-inset-bottom)",
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    
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
        //var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/ButtonController/pressState", "command":"Press", "value":true}
        //this.props.sendMessage(JSON.stringify(ops));
        this.props.sendAlexaCommand(this.props.name, this.props.device.endpointId, "ButtonController", "Press")

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
                <Paper className={classes.card}>
                    <ListItem className={classes.listItem}>
                        <Avatar onClick={ () => this.handlePress(true) }><DialpadIcon /></Avatar>
                        { this.props.zoneProperties.hasOwnProperty(this.props.name) ?
                        <ListItemText primary={this.props.name} secondary={this.props.zoneProperties[this.props.name].position}/>
                        : 
                        <ListItemText primary={this.props.name}/>
                        }
                    </ListItem>
                    { this.state.pinDevices.indexOf(this.props.name) > -1 ?
                        <PinDialog submitPin={this.submitPin} open={this.state.showPinPad} unlocker={ this.handlePinPress } close={ this.closeDialog }/>
                    : null}
                    { this.state.pinDevices.indexOf(this.props.name) > -1 ?
                        <SofaSnackbar open={this.state.showSnackBar} close={this.handleSnackBarClose} message={"Invalid PIN"} />
                    : null}
                </Paper>
        );
    }
}

ButtonZone.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonZone);

