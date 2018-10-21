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
        padding: 0,
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
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 0,

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
    chipLineLabel: {
        width: "100%",
    },
    chipListItem: {
        width: "100%",
        display: "block",
        padding: "16 24" ,
    },
    chipLine: {
        paddingTop: 0,
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
        flexGrow: 1,
        paddingLeft: 16,
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    stackLabel: {
        alignSelf: "center",
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: "16 24",
        alignItems: "center",
    },
	dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    powerLine: {
        width: "100%",
        padding: "16 16 16 12",
    },
    powerLabel: {
        padding: 0,
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ReceiverDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            topInputs: ['TV','Sonos'],
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
        this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'InputController', 'SelectInput', inputname)
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
                    <DialogContent className={classes.content}>
                    <List>
                        <ListItem  className={classes.powerLine}>
                            <Switch color="primary" checked={this.props.deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                            <ListItemText className={classes.powerLabel} primary="Power"/>
                        </ListItem>
                        <ListItem className={classes.sliderPaper}>
                            <Avatar onClick={ () => this.handleMuteChange()} >
                                {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                            </Avatar>
                            <div className={classes.stack}>
                                <Typography variant="subheading" className={classes.stackLabel} gutterBottom>Volume</Typography>
                                <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.volume+"%"}</Typography>
                                <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                                    onChange={this.handlePreVolumeChange} 
                                    onAfterChange={this.handleVolumeChange} 
                                    trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }} 
                                    handleStyle= {{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -7, height: 16, width: 16} }
                                    railStyle={{ height: 3 }}
                                />
                            </div>
                        </ListItem>
                            <ListItem className={classes.chipListItem}>
                                <Typography variant="subheading" noWrap className={classes.chipLineLabel}>Input</Typography>
                                <div className={classes.chipLine}>
                                { Object.keys(this.props.inputs).map(inp => (
                                    this.state.topInputs.includes(this.props.inputs[inp]) ?
                                    <Chip 
                                        key = {inp}
                                        label= {this.props.inputs[inp]}
                                        className={ (this.props.input==this.props.inputs[inp]) ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleInput(e, inp)}
                                    />
                                    : null
                                ))}
                                </div>
                            </ListItem>
                            <ListItem className={classes.chipListItem}>
                                <Typography variant="subheading" noWrap className={classes.chipLineLabel}>Surround Sound</Typography>
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
