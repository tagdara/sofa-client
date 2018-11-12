import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withData } from './DataContext/withData';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
import Button from '@material-ui/core/Button';


const styles = theme => ({
        
    deviceExpand: {
        padding: "0",
        marginBottom: 2,
    },
    detailList: {
        paddingLeft: 24,
    },
    dialogContent: {
        padding: 0,
    },
    expListItem: {
        padding: 0,
        width: '100%',
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    sumexp: {
        margin: '0 !important',
    },
    button: {
        minWidth: 36,
        marginRight: 2,
    },
    hotButton: {
        marginRight: 2,
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    chipline: {
        width: "100%",
    }
        

});

class DevicePropertySelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            addingAction: false,
            addingScene: false,
            editingActions: false,
            adding: false,
            filter: '',
            icons: {'SCENE_TRIGGER':TuneIcon, 'ACTIVITY_TRIGGER':ListIcon, 'LIGHT':LightbulbOutlineIcon, 'BUTTON':TouchAppIcon, 'SPEAKER':SpeakerIcon, 'THERMOSTAT':DataUsageIcon, 'RECEIVER':SpeakerGroupIcon, 'TV':TvIcon}

        }
    }
    
    propertyDevices = (devices) => {
        var propertydevices=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].displayCategories==this.state.filter || this.state.filter=='') {
                if (this.getProperties(devices[i]).length>0) {
                    console.log('adding',devices[i],'for props',this.getProperties(devices[i]))
                    propertydevices.push(devices[i])
                }
            }
        }
        return propertydevices
    }
    
    getProperties = (device, controller) => {
        console.log('device',device)
        var proplist=[]
        for (var i = 0; i < device.capabilities.length; i++) {
            if (device.capabilities[i].properties.hasOwnProperty('supported')) {
                for (var j = 0; j < device.capabilities[i].properties.supported.length; j++) {
                    if (device.capabilities[i].interface.split(".")[1]==controller || controller==null) {
                        proplist.push(device.capabilities[i].properties.supported[j].name)
                    }
                }
            }
        }
        //console.log('proplist',device.friendlyName,proplist)
        return proplist
    }
 
    getControllers = (device) => {
        var caplist=[]
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (this.getControllerCommands(capi)) {
                caplist.push(device.capabilities[cap]['interface'].split(".")[1])
            }
        }
        return caplist
    }
    
    getControllerCommands = (controller) => {
        var cmds=[]
        return this.props.controllers[controller]
    }
    
    getIcon = (category, size='default') => {

        if (this.state.icons.hasOwnProperty(category)) {
            var RealIcon=this.state.icons[category]
        } else {
            var RealIcon=DeveloperBoardIcon
        }
        
        return <RealIcon fontSize={size} />

    }
    
    filterIcon = (icon) => {
        if (this.state.filter==icon) {
            this.setState({filter:''})
        } else {
            this.setState({filter:icon})
        }
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <List className={classes.list} >
                <ListItem className={classes.chipLine}>
                { Object.keys(this.state.icons).map((icon) => 
                    <Button key={icon+"icon"} size="small" onClick={ () => this.filterIcon(icon)} className={ (this.state.filter==icon) ? classes.hotButton : classes.button }>
                        {this.getIcon(icon,'small')}
                    </Button>
                )}
                </ListItem>
                { this.propertyDevices(this.props.devices).map((device) => (
                <ExpansionPanel key={ device.endpointId+'-exp' } elevation={0} CollapseProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.summary, expanded: classes.sumexp }}>
                        <ListItem className={classes.expListItem} >
                            <ListItemIcon>{this.getIcon(device.displayCategories)}</ListItemIcon>
                            <ListItemText primary={device.friendlyName} secondary={device.displayCategories} />
                        </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.deviceExpand}>
                        <List className={classes.detailList}>
                            { this.getControllers(device).map((controller) => {
                                return this.getProperties(device,controller).map(conprop => 
                                    <ListItem key={device.endpointId+conprop} className={classes.listItem} onClick={() => this.props.select(device.friendlyName, device.endpointId, controller, conprop)}>
                                        <ListItemIcon><TuneIcon /></ListItemIcon>
                                        <ListItemText primary={conprop} secondary={controller} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                ))}
            </List>
        )
    }
}

DevicePropertySelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(DevicePropertySelect));
