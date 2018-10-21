import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Avatar from '@material-ui/core/Avatar';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const styles = theme => ({

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
        padding: 16,
        alignItems: "center",
    },
});

class StackSlider extends React.Component {
    
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
        this.props.sendAlexaCommand(this.props.name,'','SpeakerController',"SetVolume",event)
    }; 

    handleMuteChange = event => {
        this.props.sendAlexaCommand(this.props.name,'','SpeakerController',"SetMute",!this.props.deviceProperties.muted)
    }; 

    render() {

        const { classes } = this.props;

        return (
                <Paper className={classes.sliderPaper} >
                    <Avatar onClick={ () => this.handleMuteChange()}>
                        {this.props.deviceProperties.muted ? <VolumeOffIcon /> : <VolumeUpIcon /> }
                    </Avatar>
                    <div className={classes.stack}>
                        <Typography variant="subheading" className={classes.stackLabel} gutterBottom>{this.props.name}</Typography>
                        <Typography variant="caption" className={classes.stackLabel} gutterBottom>{this.state.volume+"%"}</Typography>
                        <Slider min={0} max={100} defaultValue={0} step={1} value={this.state.volume}
                            onChange={this.handlePreVolumeChange} 
                            onAfterChange={this.handleVolumeChange} 
                            trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                            handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -7, height: 16, width: 16}}
                            railStyle={{ height: 3 }}
                        />
                    </div>
                </Paper>
        );
    }
}

StackSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StackSlider);
