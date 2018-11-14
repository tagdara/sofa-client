import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import SofaSlider from '../sofaSlider'

const styles = theme => ({

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
        this.props.sendAlexaCommand(this.props.name,this.props.endpointId,'SpeakerController',"SetVolume",event)
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.name, this.props.endpointId, 'SpeakerController',"SetMute",!this.props.deviceProperties.muted)
    }; 

    render() {

        const { classes } = this.props;

        return (
                <Paper className={classes.sliderPaper} >
                    <Avatar onClick={ () => this.handleMuteChange()} >
                        {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                    </Avatar>
                    <SofaSlider padLeft={true} unit={"%"} name={this.props.name} value={this.state.volume} preChange={this.handlePreVolumeChange} change={this.handleVolumeChange} />
                </Paper>
        );
    }
}

SonosVolume.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SonosVolume);
