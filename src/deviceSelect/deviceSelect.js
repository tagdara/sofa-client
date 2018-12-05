import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withData } from '../DataContext/withData';

import List from '@material-ui/core/List';

import SofaCategoryFilter from './sofaCategoryFilter'
import DeviceExpand from './deviceExpand'

const styles = theme => ({
        

    list: {
        minWidth: 320,
        width: "100%",
    },
 
});

class DeviceSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
        }
    }
    
    filterDevices = (mode, filter, devices) => {

        if (mode=='action') {
            return this.actionDevices(filter, devices)
        } else if (mode=='property') {
            return this.propertyDevices(filter, devices)
        }
    }
    
    actionDevices = (filter, devices) => {
        var actiondevices=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].displayCategories==filter || filter=='') {
                var dc=this.getControllers(devices[i])
                for (var j = 0; j < dc.length; j++) {
                    var cc=this.getControllerCommands(dc[j])
                    if (Object.keys(cc).length>0) {
                        actiondevices.push(devices[i])
                        break
                    }
                }
            }
        }
        return actiondevices
    }

    propertyDevices = (filter, devices) => {
        var propertydevices=[]
        for (var i = 0; i < devices.length; i++) {
            if (devices[i].displayCategories==filter || filter=='') {
                if (this.getProperties(devices[i]).length>0) {
                    propertydevices.push(devices[i])
                }
            }
        }
        return propertydevices
    }
    
    
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
        return this.props.directives[controller]
    }
    
    getControllerDirectives = (controller) => {
        if (this.props.directives.hasOwnProperty(controller)) {
            return this.props.directives[controller]
        } else {
            return {}
        }
    }
    
    applyFilter = filter => {
        console.log('applying filter',filter)
        this.setState({filter: filter})
    }

    render() {
        
        const { classes, mode, devices, controllers, directives} = this.props;
        const { filter } = this.state;
        
        return (
            <List className={classes.list} >
                <SofaCategoryFilter applyFilter={this.applyFilter} />
                { this.filterDevices(mode, filter, devices).map((device) => (
                    <DeviceExpand key={ device.endpointId+'-exp' } device={device} mode={mode} controllers={controllers} select={this.props.select} directives={directives}  />
                ))}
            </List>
        )
    }
}

DeviceSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(DeviceSelect));
