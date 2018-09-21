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
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import ListIcon from '@material-ui/icons/List';
import CloseIcon from '@material-ui/icons/Close';

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
    hotAvatar: {
        background: "orangeRed",
    }
    
});


class SceneEditorScene extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            expansionPanelOpen: false,
        }
    }

    render() {

        const { classes } = this.props;
       
        return (
            <ExpansionPanel elevation={0} expanded={this.state.expansionPanelOpen}>
                <ExpansionPanelSummary className={classes.summary} expandIcon={<ExpandMoreIcon onClick={() => {
                        this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
                    }}/>}
                >
                    { this.props.edit ?
                    <Avatar onClick={ () => this.props.deleteScene(this.props.scene)} >
                        <CloseIcon/>
                    </Avatar>
                    :
                    <Avatar onClick={ () => this.props.runScene(this.props.scene)} className={this.props.shortcut==this.props.computedLevel.toString() ? classes.hotAvatar : classes.avatar}>
                        {this.props.shortcut=='x' ? <ListIcon /> : this.props.shortcut }
                    </Avatar>
                    }
                    <Typography variant="subheading" className={classes.summaryLabel} >{this.props.scene}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.sceneExpand}>
                    <List className={classes.sceneList}>
                {
                    Object.keys(this.props.scenedata).map(light => 
                        <SceneEditorLine key={'scene-line-'+light} levelsChange={this.props.levelsChange} light={light} scene={this.props.scene} area={this.props.area} lightdata={this.props.scenedata[light]} />
                )}
                        <ListItem>
                            <Button color={this.props.shortcut=="x" ? "primary" : "default"}>-</Button>
                            <Button color={this.props.shortcut=="0" ? "primary" : "default"} onClick={ () => this.props.setShortcut(this.props.area, this.props.scene, "0")}>0</Button>
                            <Button color={this.props.shortcut=="1" ? "primary" : "default"} onClick={ () => this.props.setShortcut(this.props.area, this.props.scene, "1")}>1</Button>
                            <Button color={this.props.shortcut=="2" ? "primary" : "default"} onClick={ () => this.props.setShortcut(this.props.area, this.props.scene, "2")}>2</Button>
                            <Button color={this.props.shortcut=="3" ? "primary" : "default"} onClick={ () => this.props.setShortcut(this.props.area, this.props.scene, "3")}>3</Button>
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

