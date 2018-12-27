import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import SofaDialog from '../sofaDialog';
import TvRemote from './TvRemote';

const styles = theme => ({


    chip: {
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: theme.palette.primary.main,
        color: "white",
        margin: theme.spacing.unit,
    },
    chipLine: {
        width: "100%",
    },
    gridList: { 
        maxWidth: 320,
        margin: "0 auto !important",
        backgroundColor: theme.palette.background.default,
    },
    gridButtonTile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remoteButton: {
        height: "100%",
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    }
});

class TVDialog extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: false,
            inputs: [],
        };
    }    
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.device.friendlyName});
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 
    
    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'SpeakerController', 'SetVolume', event )
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'SpeakerController', 'SetMute', !this.state.muted )
    }; 
    
    handleSurround = surroundmode => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'SurroundController', 'SetSurround', surroundmode )
    }; 

    handleInput = (event, inputname) => {
        console.log('setting input', inputname)
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'InputController', 'SelectInput', { 'input' : inputname })
    };

    handleRemoteButton = (buttonName) => {
        console.log('sending button',  buttonName)
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'RemoteController', 'PressRemoteButton', { 'buttonName' : buttonName })
    };

    
    processInputs = inputlist => {
        var inputs=[];
        var ports=[];
        for (var i = 0; i < inputlist.length; i++) { 
            if (!ports.includes(inputlist[i].uri)) {
                inputs.push(inputlist[i])
                ports.push(inputlist[i].uri)
            }
        }
        this.setState({inputs:inputs})
    }
    
    componentDidMount() {

  	    fetch('/list/sonybravia/inputs')
 		    .then(result=>result.json())
            .then(result=>this.processInputs(result));
    }
    
    render() {

        const { classes, deviceProperties, device } = this.props;

        return (
                <SofaDialog title='TV' open={this.props.open} close={this.props.close} >
                    <DialogContent>
                        <List>
                            <ListItem>
                                <ListItemText primary="Power"/>
                                <ListItemSecondaryAction>
                                    <Switch color="primary" checked={deviceProperties.powerState=='ON'} onChange={this.handlePowerChange} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <Typography variant="subtitle1" noWrap>Input</Typography>
                            </ListItem>
                            <ListItem>
                                <div className={classes.chipLine}>
                                <Chip 
                                    key = 'Android TV'
                                    label= 'Android TV'
                                    className={ (this.props.deviceProperties.input=='Android TV') ? classes.hotchip : classes.chip }
                                    onClick={ (e) => this.handleInput(e, 'Home')}
                                />
                                { this.state.inputs.map((tvinput) => 
                                    <Chip 
                                        key = {tvinput.uri}
                                        label= {tvinput.label ? tvinput.label : tvinput.title }
                                        className={ (deviceProperties.input==tvinput.label || deviceProperties.input==tvinput.title) ? classes.hotchip : classes.chip }
                                        onClick={ (e) => this.handleInput(e, tvinput.uri)}
                                    />
                                )}
                                </div>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <TvRemote endpointId={device.endpointId} name={device.friendlyName} sendAlexaCommand={this.props.sendAlexaCommand}/>
                            </ListItem>
                        </List>
                    </DialogContent>
                    <DialogActions className={classes.dialogActions} >
                        <Button onClick={() => this.props.close() } color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </SofaDialog>
        );
    }
}

TVDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TVDialog);
