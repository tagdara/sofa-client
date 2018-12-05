import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import TuneIcon from '@material-ui/icons/Tune';

const styles = theme => ({
        
    detailList: {
        paddingLeft: 24,
    },



});

class DeviceExpandProperties extends React.Component {

    getProperties = (device, controller) => {
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

    getControllerCommands = (controller) => {
        var cmds=[]
        return this.props.controllers[controller]
    }
    
    render() {
        
        const { classes, device, controllers } = this.props;
        
        return (
            <List className={classes.detailList}>
                { Object.keys(controllers).sort().map(controller => {
                    return this.getProperties(device,controller).map(prop => 
                        <ListItem key={controller+prop} onClick={() => this.props.select(device.friendlyName, device.endpointId, controller, prop)}>
                            <ListItemIcon><TuneIcon /></ListItemIcon>
                            <ListItemText primary={prop} secondary={controller} />
                        </ListItem>
                    );
                })}
            </List>
        )
    }
}

DeviceExpandProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceExpandProperties);
