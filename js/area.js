import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Paper from '@material-ui/core/Paper';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GroupLight from './devices/grouplight'
import Light from './devices/light'
import SceneEditor from './sceneEditor'

const styles  = theme =>  ({
    
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    nogrow: {
        flex: 1,
    },
    slider: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        
    },
    touchSized: {
        height: 72,
    },
    halves: {
        width: '50%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    paperItem: {
        display: "flex",
        height: 40,
        padding: "16px",
        alignItems: "center",
    },
    tabRow: {
        color: theme.palette.primary.contrastText,
        display: "flex",
        justifyContent: "center",
    },
    tabInfo: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary[500],
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    groupHead: {
        backgroundColor: theme.palette.primary[100],
        padding: 0,
    }
});


class Area extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            frontTab: 0,
            computedLevel: 0,
            level: 0,
            target: null,
            open: false,
            areaState: {},
            edit: false,
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (nextProps.hasOwnProperty('sceneData')) {
            if (nextProps.sceneData.hasOwnProperty('shortcuts')) {
                changes.level=Area.computeLevels(nextProps.sceneData, data)
            }
        }

        return changes
    }
    
    
    static computeLevels(sceneData, deviceProperties) {

        var highscore=0
        var currentlevel=0
        var scores={}

        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (sceneData['shortcuts'].hasOwnProperty(level)) {
                var sceneName=sceneData['shortcuts'][level]
                var scene=sceneData['scenes'][sceneName]

                var levscore=0
                for (var light in scene) {        
                    if (deviceProperties.hasOwnProperty(light)) {
                        if (deviceProperties[light]['powerState']=='ON') {
                            var bri=deviceProperties[light]['brightness']
                        } else {
                            var bri=0
                        }
                        levscore+=(50-Math.abs(bri-scene[light]['set']))
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
        this.setState({ level: event });
    }; 

    runScene = sceneName => {
        
        var scene=this.props.sceneData['scenes'][sceneName]
        
        for (var light in scene) {
            if (scene.hasOwnProperty(light)) {
                if (scene[light]['set']==0) {
                    if (scene[light].powerState!='OFF') {
                        this.props.sendAlexaCommand(light, '', 'PowerController', 'TurnOff')
                    }
                } else if (scene[light]['set']>0) {
                    if (scene[light].powerState!='ON') {
                        this.props.sendAlexaCommand(light, '', 'PowerController', 'TurnOn')
                    }
                    if (scene[light].brightness!=scene[light]['set']) {
                        this.props.sendAlexaCommand(light, '', 'BrightnessController', 'SetBrightness', scene[light]['set'])
                    }
                }
            } else {
                console.log('Light not in device properties',light)
            }
        }
        
    }


    runShortcut = level => {
        console.log('run shortcut', level)
        
        if (this.props.sceneData['shortcuts'].hasOwnProperty(level.toString())) {
            var sceneName=this.props.sceneData['shortcuts'][level]
            this.runScene(sceneName)
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }


    render() {
        const { classes, fullScreen } = this.props;
        const { devices } = this.state;  
        return (
            <Paper elevation={2} className={classes.paperItem} >
                <Typography variant="subheading" className={classes.halves} onClick={ () => this.props.selectArea(this.props.name)}>{this.props.name}</Typography>
                <Slider className={classes.halves} min={0} max={3} defaultValue={this.state.level} value={this.state.level}
                    trackStyle={{ backgroundColor: 'orangeRed', opacity: .5, height: 3 }}
                    handleStyle={{ borderColor: 'orangeRed', backgroundColor: 'orangeRed', marginTop: -7, height: 16, width: 16}}
                    railStyle={{ height: 3 }}
                    onChange={this.handlePreLevelChange} 
                    onAfterChange={this.runShortcut} 
                />
            </Paper>
        );
    }
}

Area.propTypes = {
  classes: PropTypes.object.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};


export default withStyles(styles)(withMobileDialog()(Area));

