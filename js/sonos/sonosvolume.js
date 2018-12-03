import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SofaSlider from '../sofaSlider'

const styles = theme => ({

    hotAvatar: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    sliderPaper: {
        display: "flex",
        flexDirection: "row",
        padding: 16,
        alignItems: "center",
    },
});

class SonosVolume extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            volume: 0,
        };

    }    

    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.deviceProperties.volume !== prevState.volume) {
            changes['volume']=nextProps.deviceProperties.volume
        }  
        return changes
    }

    handlePreVolumeChange = event => {
        this.setState({ volume: event, target:this.props.name});
    }; 

    handleVolumeChange = event => {
        this.props.sendAlexaCommand(this.props.name,this.props.endpointId,'SpeakerController',"SetVolume", { "volume" : event} )
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, 'SpeakerController',"SetMute", { "muted" : !this.props.deviceProperties.muted } )
    }; 

    render() {

        const { classes, deviceProperties } = this.props;

        return (
                <ListItem className={classes.sliderPaper} >
                    <Avatar onClick={ () => this.handleMuteChange()} className={ (!deviceProperties.muted && deviceProperties.playbackState=='PLAYING') ? classes.hotAvatar : classes.normalAvatar }>
                        { deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                    </Avatar>
                    <SofaSlider padLeft={true} unit={"%"} name={this.props.name} value={this.state.volume} preChange={this.handlePreVolumeChange} change={this.handleVolumeChange} />
                </ListItem>
        );
    }
}

SonosVolume.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosVolume);
