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

class DeviceExpandActions extends React.Component {

    getControllerCommands = (controller) => {
        var cmds=[]
        if (this.props.directives.hasOwnProperty(controller)) {
            return Object.keys(this.props.directives[controller])
        }
        console.log('Did not find',controller,'in',this.props.directives)
        return []
    }
    
    componentDidMount() {
        console.log(this.props.controllers)
    }
    
    render() {
        
        const { classes, device, controllers } = this.props;
        
        return (
            <List className={classes.detailList}>
                { Object.keys(controllers).sort().map((controller) => {
                    return Object.keys(controllers[controller]).sort().map((action) => (
                        <ListItem key={controller+action} onClick={() => this.props.select('command', device.friendlyName, device.endpointId, controller, action)}>
                            <ListItemIcon><TuneIcon /></ListItemIcon>
                            <ListItemText primary={action} secondary={controller} />
                        </ListItem>
                    ));
                })}
            </List>
        )
    }
}

DeviceExpandActions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceExpandActions);
