import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import ReceiverDialog from './receiverDialog';
import SofaSlider from '../sofaSlider'
import SofaCard from '../sofaCard'

const styles = theme => ({
    
    hotAvatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    listItem: {
        width: '100%',
        minHeight: 48,
        padding: 0,
    },
		listItemBottom: {
				padding: "32 0 0 0",
		}
});

class Receiver extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: 'OFF',
            showdialog: false,
            inputs: {},
            volume: 50,
        };
        
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.deviceProperties.powerState !== prevState.powerState) {
            changes['powerState']=nextProps.deviceProperties.powerState
        }  
        if (nextProps.deviceProperties.volume !== prevState.volume) {
            changes.volume=nextProps.deviceProperties.volume
        }

        return changes
    } 
    
    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'SpeakerController', 'SetVolume', { "volume" : event} )
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'SpeakerController', 'SetMute', { "muted" : !this.state.muted} )
    }; 
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked });
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, this.props.device.endpointId, 'PowerController', 'TurnOff')
        }
    }; 

    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => { 
        this.setState({ showdialog: false})
    } 
    
    getYamahaInput = inputname => {
        // this is to fix the hacky yamaha input naming system
        for (var yinput in this.state.inputs) {
            if (inputname==yinput) {
                return this.state.inputs[yinput]
            }
            if (inputname==yinput.replace('_','')) {
                return this.state.inputs[yinput]
            }
        }
        return inputname
                
    }

    componentDidMount() {

  	    fetch('/list/yamaha/inputs')
 		    .then(result=>result.json())
            .then(result=>this.setState({inputs:result}));
    }
    
    render() {

        const { classes, name, device, deviceProperties } = this.props;
        const { powerState, inputs } = this.state;
        
        return (
                <SofaCard>
                    <ListItem className={classes.listItem}>
                        <Avatar onClick={ () => this.handleClickOpen() } className={ powerState=='ON' ? classes.hotAvatar : classes.normalAvatar } ><SpeakerGroupIcon /></Avatar>
                        <ListItemText onClick={ () => this.handleClickOpen()} primary={name} secondary={deviceProperties.input ? this.getYamahaInput(deviceProperties.input) + " / "+ deviceProperties.surround : null}/>
                        <Switch color="primary" checked={powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                    </ListItem>
                { this.getYamahaInput(deviceProperties.input)=='Sonos' || powerState!='ON' ? null :
                    <ListItem className={classes.listItemBottom}>
                        <Avatar onClick={ () => this.handleMuteChange()} >
                            {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                        </Avatar>
                        <SofaSlider name="Volume" unit="%" min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                                    minWidth={240} preChange={this.handlePreVolumeChange} change={this.handleVolumeChange} padLeft={true} />
                    </ListItem>
                }
                    <ReceiverDialog input={this.getYamahaInput(deviceProperties.input)} inputs={inputs} sendAlexaCommand={this.props.sendAlexaCommand} showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={name} device={ device } deviceProperties={ deviceProperties } sendMessage={ this.props.sendMessage } />
                </SofaCard>
        );
    }
}

Receiver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Receiver);
