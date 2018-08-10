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
const styles = theme => ({

    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "borderbox",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cardname: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 8,
    },
    content: {
        minWidth: 0,
        paddingBottom: 16,
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    chip: {
        background: "silver",
        color: "black",
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        margin: theme.spacing.unit,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    stackedVolumeControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    slider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    slidername: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },    
    dialog: {
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        maxWidth: '480px',
        minWidth: '320px',
        boxSizing: "border-box",
    },
    cover: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
        margin: 16,
    },
    embeddedExpansion: {
        padding:0,
    },
    chipLine: {
        width: "100%",
    }
});

class ReceiverDialog extends React.Component {
    
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
        };
    }    
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (data.hasOwnProperty('volume')) {
            changes.volume=data.volume
        }

        return changes
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
    
    handleSurround = (event, surroundmode) => {
        event.stopPropagation();
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/SurroundController/surround", "command":"SetSurround", "value":surroundmode}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    handleInput = (event, inputname) => {
        event.stopPropagation();
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/InputController/input", "command":"SetInput", "value":inputname}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

    
    render() {

        const { classes, theme } = this.props;

        return (
                <Dialog fullScreen open={this.props.showdialog} onClose={() => this.props.closeDialog()} className={classes.dialog}>
                    <DialogTitle >{this.props.name}</DialogTitle>
                    <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Power"/>
                            <ListItemSecondaryAction>
                                <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem>
                        <Avatar onClick={ () => this.handleMuteChange()}>
                            {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                        </Avatar>
                        <List className={classes.stackedVolumeControl}>
                            <ListItem className={classes.sliderName}>
                                <ListItemText className={classes.deviceName} primary="Volume"/>
                            </ListItem>
                            <ListItem className={classes.slider}>
                                <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                                    onChange={this.handlePreVolumeChange} 
                                    onAfterChange={this.handleVolumeChange} 
                                    trackStyle={ this.props.deviceProperties.powerState ? { backgroundColor: 'orangeRed', opacity: .5, height: 10 } : { backgroundColor: 'silver', height: 10 }}
                                    handleStyle={ this.props.deviceProperties.powerState ? 
                                        { borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16} :
                                        { borderColor: 'silver', backgroundColor: 'silver', marginTop: 0, height: 10}
                                    }
                                    railStyle={{ height: 10 }}
                                />
                            </ListItem>
                        </List>
                        </ListItem>
                        <Divider />
                        <List>
                            <ListItem >
                                <ListItemText className={classes.deviceName} primary="Input"/>
                            </ListItem>
                            <ListItem className={classes.chipLine}>
                                    <Chip 
                                        key = 'Sonos'
                                        label= 'Sonos'
                                        className={ (this.props.deviceProperties.input=='AV5') ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleInput(e, 'AV_5')}
                                    />
                                    <Chip 
                                        key = 'TV'
                                        label='TV'
                                        className={  (this.props.deviceProperties.input=='HDMI1') ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleInput(e, 'HDMI_1')}
                                    />
                            </ListItem>
                        </List>
                        <Divider />
                        <ListItem>
                        <ExpansionPanel elevation={0}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} className={classes.embeddedExpansion}>
                                <div>
                                    <Typography variant="subheading" noWrap>Surround Sound</Typography>
                                    <div className={classes.chipLine}>
                                    <Chip 
                                        key = '7ch Stereo'
                                        label= '7ch Stereo'
                                        className={ (this.props.deviceProperties.surround=='7ch Stereo') ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleSurround(e, '7ch Stereo')}
                                    />
                                    <Chip 
                                        key = 'Surround Decoder'
                                        label='Surround Decoder'
                                        className={  (this.props.deviceProperties.surround=='Surround Decoder') ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleSurround(e, 'Surround Decoder')}
                                    />
                                    </div>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    Other Surround Sound Modes Go Here
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </ListItem>
                    </List>
                    </DialogContent>
                    <DialogActions>
                        <Button  onClick={() => this.props.closeDialog() } color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                    
                </Dialog>
        );
    }
}

ReceiverDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ReceiverDialog);
