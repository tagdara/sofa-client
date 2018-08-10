import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const styles = theme => ({
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
        paddingTop:0,
        paddingBottom:0,
    },
    stackedVolumeControl: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop:0,
        paddingBottom:0,
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
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/volume", "command":"SetVolume", "value":event}
        this.props.sendMessage(JSON.stringify(ops));
    }; 


    handleMuteChange = event => {
        var ops={"op":"set", "path":"discovery/"+this.props.name+"/MusicController/muted", "command":"SetMute", "value":!this.props.deviceProperties.muted}
        this.props.sendMessage(JSON.stringify(ops));
    }; 

 
    render() {

        const { classes, theme } = this.props;

        return (
                <Paper className={this.props.classes.paperLight}>
                    <Avatar onClick={ () => this.handleMuteChange()}>
                        {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                    </Avatar>
                    <List className={this.props.classes.stackedVolumeControl}>
                        <ListItem className={this.props.classes.sliderName}>
                            <ListItemText className={this.props.classes.deviceName} primary={this.props.name}/>
                        </ListItem>
                        <ListItem className={this.props.classes.slider}>
                            <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                                onChange={this.handlePreVolumeChange} 
                                onAfterChange={this.handleVolumeChange} 
                                trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 10 }}
                                handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -3, height: 16, width: 16}}
                                railStyle={{ height: 10 }}
                            />
                        </ListItem>
                    </List>
                </Paper>
        );
    }
}

SonosVolume.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SonosVolume);
