import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const styles  = theme =>  ({
    
    halves: {
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
    },
    areaListItem: {
        display: "flex",
        height: 64,
        padding: "16 32 16 24",
        alignItems: "center",
    },
});


class Area extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            level: 0,
            delaySet: false,
        };
    }
    
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (nextProps.hasOwnProperty('deviceProperties')) {
            changes.devices=nextProps.devices
            changes.deviceProperties=nextProps.deviceProperties
            if (prevState.hasOwnProperty('delaySet')) {
                if (!prevState.delaySet) {
                    changes.level=Area.computeLevels(nextProps.sceneData, data, nextProps, prevState)
                }
            } else {
                changes.level=Area.computeLevels(nextProps.sceneData, data, nextProps, prevState)
            }
        }
        return changes
    }
    
    
    static computeLevels(sceneData, deviceProperties, nextProps, prevState) {

        var highscore=0
        var currentlevel=0
        var scores={}
        
        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (nextProps.shortcuts.hasOwnProperty(level)) {
                var sceneName=nextProps.shortcuts[level]
                var scene=nextProps.sceneData[sceneName]

                var levscore=0
                for (var light in scene) {    
                    if (deviceProperties.hasOwnProperty(light)) {
                        if (deviceProperties[light]['powerState']=='ON') {
                            var bri=deviceProperties[light]['brightness']
                        } else {
                            var bri=0
                        }
                        levscore+=(50-Math.abs(bri-scene[light]['brightness']))
                    }
                }

                scores[level]=levscore
                if (levscore>highscore) {
                    currentlevel=i
                    highscore=levscore
                }
            }
        }

        return currentlevel
    }

    handlePreLevelChange = event => {
        
        this.setState({ level: event, delaySet: true});
    }; 

    runScene = sceneName => {
        this.props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }
    
    endSliderDelay = () => {
        this.setState({ delaySet: false},
                () =>  Area.computeLevels(this.props.sceneData,this.props.deviceProperties, this.state)
        );
    }
    
    delaySliderUpdates = () => {
        this.setState({ delaySet: true},
            () =>  setTimeout(() => endSliderDelay(), 1000)
        )
    }

    runShortcut = level => {

        if (this.props.shortcuts.hasOwnProperty(level.toString())) {
            var sceneName=this.props.shortcuts[level]
            this.runScene(sceneName)
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }

    render() {
        
        const { classes } = this.props;

        return (
            <ListItem className={classes.areaListItem}>
                <Typography variant="subheading" className={classes.halves} onClick={ () => this.props.selectArea(this.props.name)}>{this.props.name}</Typography>
                <Slider className={classes.halves} min={0} max={3} defaultValue={this.state.level} value={this.state.level}
                    trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                    handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -7, height: 16, width: 16}}
                    railStyle={{ height: 3 }}
                    onChange={this.handlePreLevelChange} 
                    onAfterChange={this.runShortcut} 
                />
            </ListItem>
        );
    }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Area);

