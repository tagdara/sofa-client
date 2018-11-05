import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';

import ShuffleIcon from '@material-ui/icons/Shuffle';
import CloseIcon from '@material-ui/icons/Close';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';

const styles = theme => ({
        
    areaInput: {
        marginTop:0,
        marginLeft: 16,
        flexGrow:1,
        flexBasis:0,
    },
    deviceName: {
        padding: 0,
        flexGrow:1,
        flexBasis:0,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    dialogContent: {
        padding: 0,
    },
    listActions: {
        minWidth: 320,
        width: "100%",
    },
    listItem: {
        padding: 16,

    },
    item: {
        padding: 16,
    },

});


class EventAction extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            icons: {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}
        }
    }
    
    getIcon = (category, size='default') => {

        if (this.state.icons.hasOwnProperty(category)) {
            var RealIcon=this.state.icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        return <RealIcon fontSize={size} />
    }

    editValue = (value) => {
        var action=this.props.action
        action.value=value
        this.save(action)
    }
    
    save = (action) => {
        this.props.save(this.props.index, action)
    }

    render() {
        
        const { classes, index, name, action, propertyName, device} = this.props;
        
        return (
            <ListItem className={classes.item} >
                {this.props.edit ?
                <ListItemIcon onClick={() => this.props.delete(index)}><CloseIcon /></ListItemIcon>   
                :
                <ListItemIcon onClick={() => this.props.run(name,index)}>{this.getIcon(device.displayCategories[0])}</ListItemIcon>
                }
                <ListItemText primary={device.friendlyName} secondary={action.controller.replace('Controller','')+" / "+action.command} className={classes.deviceName}/>
                {this.props.actionValue ?
                    <TextField
                        className={classes.areaInput}
                        id={'action'+index}
                        label={propertyName}
                        margin="normal"
                        value={action.value}
                        onChange={(e) => this.editValue(e.target.value)}
                    />
                : null }
                {this.props.edit ?
                    <ListItemSecondaryAction className={classes.listItem}>
                        <IconButton onClick={() => this.props.moveUp(index)}><ExpandLessIcon /></IconButton>   
                        <IconButton onClick={() => this.props.moveDown(index)}><ExpandMoreIcon /></IconButton>
                    </ListItemSecondaryAction>
                : null }
            </ListItem>
        )
    }
}

EventAction.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventAction);
