import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import ReceiverDialog from './receiverDialog';

const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8 24 16 24",
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "space-between",
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
});

class Receiver extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tracked: ['surround','decoder','input','volume','powerState'],
            endpointId: '',
            surround: '',
            decoder: '',
            input: '',
            volume: 0,
            powerState: false,
            icon: '/react/images/receiver.png?v2',
            showdialog: false,
        };
        
        this.closeDialog = this.closeDialog.bind(this);
        this.setState = this.setState.bind(this);
    }
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
        } else {
            var ops={"op":"set", "path":"discovery/"+this.props.device.friendlyName+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SpeakerController/volume", "command":"SetVolume", "value":event}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    handleMuteChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SpeakerController/muted", "command":"SetMute", "value":!this.state.muted}
        this.props.sendMessage(JSON.stringify(ops));
    }; 
    
    handleSurround = surroundmode => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SurroundController/surround", "command":"SetSurround", "value":surroundmode}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => { 
        this.setState({ showdialog: false})
    } 

     
    render() {

        const { classes, theme } = this.props;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen()}>
                        <div className={classes.cardname}>
                            <Typography variant="body2">{this.props.name}</Typography>
                        </div>
                        <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                    </CardContent>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen()}>
                        <div className={classes.metadata}>
                            <Typography variant="subheading" noWrap>{this.props.deviceProperties.input}</Typography>
                            <Typography variant="body1" color="textSecondary" noWrap>
                                {this.props.deviceProperties.surround}
                            </Typography>
                        </div>
                        <img src={this.state.icon} className={classes.icon} />
                    </CardContent>
                    <ReceiverDialog showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={this.props.name} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={ this.props.sendMessage } />
                </Card>
        );
    }
}

Receiver.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Receiver);
