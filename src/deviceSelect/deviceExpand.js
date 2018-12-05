import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Button from '@material-ui/core/Button';

import DeviceItem from './deviceItem'
import DeviceExpandActions from './deviceExpandActions'
import DeviceExpandProperties from './deviceExpandProperties'

const styles = theme => ({
        
    deviceExpand: {
        padding: "0",
        marginBottom: 2,
    },
    detailList: {
        paddingLeft: 24,
    },
    expListItem: {
        padding: 0,
        width: '100%',
    },
    list: {
        minWidth: 320,
        width: "100%",
    },
    summary: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    sumexp: {
        margin: '0 !important',
    },


});

class DeviceExpand extends React.Component {

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

    getActionControllers = (device) => {
        var caplist={}
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (this.getControllerActions(capi)) {
                caplist[capi]=this.getControllerActions(capi)
            }
        }
        return caplist
    }

    getPropertyControllers = (device) => {
        var caplist={}
        for (var cap in device.capabilities) {
            var capi=device.capabilities[cap]['interface'].split(".")[1]
            if (device.capabilities[cap].properties.hasOwnProperty('supported')) {
                caplist[capi]=device.capabilities[cap].properties.supported
            }
        }
        return caplist
    }

    getControllerActions = (controller) => {
        
        var cmds=[]
        if (this.props.directives) {
            if (this.props.directives.hasOwnProperty(controller)) {
                return this.props.directives[controller]
            } 
        }
        return {}
    }
    

    render() {
        
        const { classes, device, mode } = this.props;
        
        return (
                <ExpansionPanel elevation={0} CollapseProps={{ unmountOnExit: true }}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} classes={{ root: classes.summary, expanded: classes.sumexp }}>
                        <DeviceItem categories={device.displayCategories} name={device.friendlyName} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.deviceExpand}>
                        { mode=='action' ?
                            <DeviceExpandActions device={device} controllers={this.getActionControllers(device)} select={this.props.select} />
                        :
                            <DeviceExpandProperties device={device} controllers={this.getPropertyControllers(device)} select={this.props.select} />
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
        )
    }
}

DeviceExpand.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceExpand);
