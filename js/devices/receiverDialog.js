import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

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

import Toolbar from '@material-ui/core/Toolbar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

const styles = theme => ({

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
    cover: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
        margin: 16,
    },
    chipLine: {
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
    },
    stack: {
        height: 44,
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: "center",
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 8 16 16",
        alignItems: "center",
        minWidth: 320,
        maxWidth: 480,
    },
    stackSlider: {
        marginTop: 4,
        marginLeft: 4,
        marginRight: 6,
    },
		dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOff')
        }
    }; 
    
    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'SpeakerController', 'SetVolume', event)
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'SpeakerController', 'SetMute', !this.state.muted)
    }; 
    
    handleSurround = (event, surroundmode) => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'SurroundController', 'SetSurround', surroundmode)
    }; 

    handleInput = (event, inputname) => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'InputController', 'SetInput', inputname)
    }; 

    
    render() {

        const { classes, fullScreen} = this.props;

        return (
                <Dialog 
                    fullScreen={fullScreen}
                    fullWidth={true}
                    maxWidth={'sm'}
                    open={this.props.showdialog}
                    onClose={() => this.props.closeDialog()}
                    TransitionComponent={Transition}
                    className={fullScreen ? classes.fullDialog : classes.normalDialog }
                >
                    <DialogTitle className={classes.tabTitle}>
                        <Toolbar elevation={0}>
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                                {this.props.name}
                            </Typography>
                        </Toolbar>
                    </DialogTitle>
                    <DialogContent>
                    <List>
                        <ListItem>
                            <ListItemText primary="Power"/>
                            <ListItemSecondaryAction>
                                <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                        <ListItem className={classes.sliderPaper}>
                            <Avatar onClick={ () => this.handleMuteChange()} >
                                {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                            </Avatar>
                            <div className={classes.stack}>
                                <Typography variant="subheading">Volume</Typography>
                                <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                                    onChange={this.handlePreVolumeChange} 
                                    onAfterChange={this.handleVolumeChange} 
                                    trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }} 
                                    handleStyle= {{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -5, height: 12, width: 12} }
                                    railStyle={{ height: 3 }}
                                    className={classes.stackSlider}
                                />
                            </div>
                        </ListItem>
                        <Divider />
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
                            <Divider />
                            <ListItem>
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
                            </ListItem>
                    </List>
                    </DialogContent>
										<Divider />
                    <DialogActions className={classes.dialogActions}>
												
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
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ReceiverDialog));
