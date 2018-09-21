import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    
    isAShortcut = (scene) => {
        for (var shortcut in this.props.areadata['shortcuts']) {
            if (this.props.areadata['shortcuts'][shortcut]==scene) {
                return shortcut
            } 
        }
        
        return 'x'
            
    }
    
    componentDidMount() {
        console.log(this.props.areadata)
    
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <DialogContent className={classes.dialogContent }>
                {
                Object.keys(this.props.areadata['scenes']).map(scene => 
                    <SceneEditorScene computedLevel={this.props.computedLevel} setShortcut={this.props.setShortcut} shortcut={this.isAShortcut(scene)} edit={this.props.edit} addScene={this.props.addScene} deleteScene={this.props.deleteScene} runScene={this.props.runScene}  key={'scene-edit-'+scene} scene={scene} area={this.props.area} scenedata={this.props.areadata['scenes'][scene]} levelsChange={this.props.levelsChange} />
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


export default withStyles(styles)(SceneEditorArea);
