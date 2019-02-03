import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { withData } from '../DataContext/withData';
import SceneEditorScene from './sceneEditorScene';
import SceneAdd from './sceneAdd';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({

    dialogContent: {
        height: "100%",
        padding: 8,
    },   
});    

class SceneEditorArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scenes: {},
            shortcuts: {},
            lights: {},
            sceneData: {},
        }
    }
    
    isAShortcut = (scene) => {
        for (var shortcut in this.state.shortcuts) {
            if (this.state.shortcuts[shortcut]==scene) {
                return shortcut
            } 
        }
        return 'x'
    }
    
    devicesByArea = area => {

        var ads=[]
        for (var dev in this.state.lights) {
            var dbn=this.props.deviceByName(dev)
            if (dbn) {
                ads.push(dbn)
            }
        }
        return ads
    }
    
    runScene = sceneName => {
        this.props.sendAlexaCommand(sceneName, "logic:scene:"+sceneName, "SceneController", "Activate")
    }
    
    componentDidMount() {

        fetch('/list/logic/scenes')
 		    .then(result=>result.json())
 		    .then(result=>this.setState({sceneData:result}))
        
        fetch('/list/logic/area/'+this.props.name)
 		    .then(result=>result.json())
 		    .then(result=>this.setState(result))

    }
    
    sortByShortcuts = () => {
        var sortlist=Object.keys(this.state.scenes).sort().reverse();
        var sc=Object.keys(this.state.shortcuts).sort();
        for (var i = 0; i < sc.length; i++) {
            if (sortlist.indexOf(this.state.shortcuts[sc[i]])>0) {
                sortlist.splice(sortlist.indexOf(this.state.shortcuts[sc[i]]),1);
                sortlist.unshift(this.state.shortcuts[sc[i]])
            }
        }  
        return sortlist
        
    }
 
    render() {
        
        const { classes, computedLevel } = this.props;
        const { scenes, sceneData, lights } = this.state;
        
        return (
            <DialogContent className={classes.dialogContent }>
                { this.sortByShortcuts().map(scene => 
                    <SceneEditorScene devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } 
                        setShortcut={this.props.setShortcut} shortcut={this.isAShortcut(scene)} edit={this.props.edit} addScene={this.props.addScene} 
                        deleteScene={this.props.deleteScene} runScene={this.runScene}  key={'scene-edit-'+scene} name={scene} 
                        area={this.props.area} lights={lights} scene={sceneData[scene]} levelsChange={this.props.levelsChange} computedLevel={computedLevel} />
                )}
                { this.props.edit ?
                    <SceneAdd addScene={this.props.addScene} area={this.props.area} />
                : null }
            </DialogContent>
        )
    }
};

SceneEditorArea.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withData(withStyles(styles)(SceneEditorArea));
