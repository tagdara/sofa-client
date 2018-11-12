import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SceneEditorLine from './sceneEditorLine';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';
import StarIcon from '@material-ui/icons/Star';

const styles = theme => ({
        
    sceneExpand: {
        padding: 0,
        margin: 0,
    },
    sceneList: {
        width: "100%",
    },
    summary: {
        padding: "0 8",
        alignItems: "center",
    },
    summaryLabel: {
        alignSelf: "center",
        padding: "0 16",
    },
    avatar: {
        color: theme.palette.primary.contrastText,    
    },
    hotAvatar: {
        color: theme.palette.primary.contrastText,
        background: theme.palette.primary.main,
    },
    button: {
        minWidth: 36
    },
    hotButton: {
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },    
});


class SceneEditorScene extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            expansionPanelOpen: false,
            shortcutIds: ['x','0','1','2','3'],
        }
    }
    
    nameByEndpointId = endpointId => {
        var fn=[]
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i]['endpointId']==endpointId) {
                return this.props.devices[i].friendlyName
            } 
        }
        console.log('Did not find device named', endpointId, this.props.devices.length)
    }
    
    endpointIdByName = name => {

        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i]['friendlyName']==name) {
                return this.props.devices[i].endpointId
            } 
        }
        console.log('Did not find device named', name, this.props.devices.length)
    }
    
    sceneLevelChange = (endpointId, brightness) => {
        var curscene=this.props.scene
        curscene[endpointId]={'brightness':brightness}
        this.saveScene(curscene)
    }
    
    saveScene = (data) => {

        fetch('/save/logic/scene/'+this.props.name, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    }
    
    brightnessIflightInScene = light => {
        var endpointId=this.endpointIdByName(light)
        if (this.props.scene) {
            if (this.props.scene.hasOwnProperty(endpointId)) {
                if (this.props.scene[endpointId].hasOwnProperty('brightness')) {
                    return this.props.scene[endpointId].brightness
                }
            }
        }
        return 0
    }

    render() {

        const { classes, scene, name, edit, area, lights, shortcut } = this.props;
        const { shortcutIds } = this.state;
        return (
            <ExpansionPanel elevation={0} expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon onClick={() => {
                        this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen }); }}/>} >
                    { edit ?
                    <Avatar onClick={ () => this.props.deleteScene(name)} >
                        <CloseIcon/>
                    </Avatar>
                    :
                    <Avatar className={this.props.shortcut==this.props.computedLevel.toString() ? classes.hotAvatar : classes.avatar}
                            onClick={ () => this.props.runScene(name)}>
                        {this.props.shortcut=='x' ? <ListIcon /> : this.props.shortcut }
                    </Avatar>
                    }
                    <Typography variant="subtitle1" className={classes.summaryLabel} >{name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.sceneExpand}>
                    <List className={classes.sceneList}>
                        { Object.keys(lights).map(light => 
                            <SceneEditorLine brightness={ this.brightnessIflightInScene(light) } 
                                                key={'scene-line-'+light} levelsChange={this.sceneLevelChange} name={light} endpointId={this.endpointIdByName(light)} 
                                                scenename={name} scene={scene} area={this.props.area} />
                        )}
                        <ListItem>
                            <ListItemIcon>
                                <StarIcon />
                            </ListItemIcon>

                        {   shortcutIds.map(sc => 
                            <Button onClick={ () => this.props.setShortcut(area, name, sc)} size="small" key = {sc+'m'} 
                                    className={( shortcut==sc ) ? classes.hotButton : classes.button }>
                            {sc}
                            </Button>
                        )}
                        </ListItem>                        
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }
};

SceneEditorScene.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SceneEditorScene);

