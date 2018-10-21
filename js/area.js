import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
        flexGrow: 1,
        flexBasis: 0,
        boxSizing: "border-box",
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    areaListItem: {
        display: "flex",
        height: 64,
        padding: "16 32 16 24",
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
            scenes: {},
            shortcuts: {},
            lights: {},
            frontTab: 0,
            computedLevel: 0,
            level: -1,
            target: null,
            open: false,
            areaState: {},
            edit: false,
            delaySet: true,
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
                    changes.level=Area.computeLevels(nextProps.sceneData, data, prevState)
                }
            }
        }

        return changes
    }
    
    
    static computeLevels(sceneData, deviceProperties, prevState) {

        var highscore=0
        var currentlevel=0
        var scores={}

        for (var i = 0; i < 4; i++) {
            var level=i.toString()
            if (prevState.shortcuts.hasOwnProperty(level)) {
                var sceneName=prevState.shortcuts[level]
                var scene=prevState.scenes[sceneName]

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
        
        this.setState({ level: event, delaySet: true});
    }; 

    runScene = sceneName => {
        var fullscene=this.props.name+" "+sceneName
        this.props.sendAlexaCommand(fullscene, "logic:scene:"+fullscene, "SceneController", "Activate")
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
        console.log('run shortcut', level, this.state.shortcuts)
        
        if (this.state.shortcuts.hasOwnProperty(level.toString())) {
            var sceneName=this.state.shortcuts[level]
            this.runScene(sceneName)
        } else {
            console.log('No scene shortcut for area level', level)
        }
    }
    
    parseAreaScenes = (areascenes) => {
        var changes={}
        if (areascenes.hasOwnProperty('lights')) {
            changes['lights']=areascenes['lights']
        }
        if (areascenes.hasOwnProperty('scenes')) {
            changes['scenes']=areascenes['scenes']
            changes['delaySet']=false
        }
        if (areascenes.hasOwnProperty('shortcuts')) {
            changes['shortcuts']=areascenes['shortcuts']
        }

        if (changes) {
            this.setState(changes,
                () => Area.computeLevels(this.props.sceneData,this.props.deviceProperties, this.state)
            );
        }
    }
    
    componentDidMount() {    
  	    fetch('/list/logic/areascenes/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.parseAreaScenes(result));
    }

    render() {
        const { classes, fullScreen } = this.props;
        const { devices } = this.state;  
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
  fullScreen: PropTypes.bool.isRequired,
};


export default withStyles(styles)(withMobileDialog()(Area));

