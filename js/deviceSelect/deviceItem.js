import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DataUsageIcon from '@material-ui/icons/DataUsage';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SpeakerIcon from '@material-ui/icons/Speaker';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import TuneIcon from '@material-ui/icons/Tune';
import ListIcon from '@material-ui/icons/List';
import TvIcon from '@material-ui/icons/Tv';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';


const styles = theme => ({
        
    expListItem: {
        padding: 0,
        width: '100%',
    },
 

});

const icons = {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}

class DeviceItem extends React.Component {

    getIcon = (category, size='default') => {
            
        var pxSize=24;
        if (size=='small') {
            pxSize=16
        }
        if (icons.hasOwnProperty(category)) {
            var RealIcon=icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        
        return <RealIcon size={pxSize} fontSize={size} />
    }

    render() {
        
        const { classes, categories, name } = this.props;
        
        return (
            <ListItem className={classes.expListItem} >
                <ListItemIcon>{this.getIcon(categories)}</ListItemIcon>
                <ListItemText primary={name} secondary={categories} />
            </ListItem>
        )
    }
}

DeviceItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceItem);
