
import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withData } from './dataContext';

import Shade from './devices/shade';
import Sprinkler from './devices/sprinkler';
import StatusLock from './devices/statusLock';

import Divider from '@material-ui/core/Divider';

const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});



class VirtualList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            devices: {},
        };
    }
    
    getStatusProp = statusDef => {
        var dev=this.props.deviceByEndpointId(statusDef.endpointId)
        var dp=this.props.propertiesFromDevices(dev)[dev.friendlyName]
        return dp[statusDef.property]
    }
    
    render() {
    
        const { classes, virtualDevices, deviceByEndpointId, propertiesFromDevices } = this.props;
        
        return (
            virtualDevices ?
                <List className={classes.list}>
                    {
                        Object.keys(virtualDevices).map((key, index) => (
                            virtualDevices[key]['type']=='shade' ?
                                <Shade key={ index } name={ key } endpointId={ virtualDevices[key].endpointId } commands={ virtualDevices[key].commands } sendAlexaCommand={this.props.sendAlexaCommand} />
                                :null
                        ))
                    }
                    <Divider />
                    {
                        Object.keys(virtualDevices).map((key, index) => (
                            virtualDevices[key]['type']=='water' ?
                                <Sprinkler key={ index } name={ key } commands={ virtualDevices[key].commands } sendAlexaCommand={this.props.sendAlexaCommand} />
                                :null
                        ))
                    }
                    <Divider />
                    {
                        Object.keys(virtualDevices).map((key, index) => (
                            virtualDevices[key]['type']=='lock' ?
                                <StatusLock key={ index } name={ key }
                                    status={ this.getStatusProp(virtualDevices[key].status) }
                                    commands={ virtualDevices[key].commands } sendAlexaCommand={this.props.sendAlexaCommand} />
                                :null
                        ))
                    }
    
                </List>
            : null 
        );
    }
}

VirtualList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(VirtualList));
