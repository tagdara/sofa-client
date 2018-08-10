
import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Receiver from './devices/receiver';
import Tv from './devices/tv';
import Zone from './devices/zone';

const components = {
    Tv: Tv,
    Receiver: Receiver,
    Zone: Zone,
};


const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});




class DeviceList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            devices: [],
            deviceState: {},
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        var pstate=prevState.deviceState
        for (var i = 0; i < prevState.devices.length; i++) {
            if (nextProps.deviceState.hasOwnProperty(prevState.devices[i].friendlyName)) {
                pstate[prevState.devices[i].friendlyName]=nextProps.deviceState[prevState.devices[i].friendlyName]
            }
        }
        //if (!prevState.hasOwnProperty('deviceState')) {
        //    changes.deviceState=nextProps.deviceState;
        //}
        if (!prevState.hasOwnProperty('classes')) {
            changes.classes=nextProps.classes;
        }
        if (!prevState.hasOwnProperty('updateDevice')) {
            changes.updateDevice=nextProps.updateDevice;
        }
        if (!prevState.hasOwnProperty('sender')) {
            changes.sender=nextProps.sender;
        }
        changes.deviceState=pstate
        return changes
    
    }
    
    
    setBaseState = data => {

        var devstate=this.state.deviceState
        for (var i = 0; i < data.length; i++) {
            if (!devstate.hasOwnProperty(devstate[data[i].friendlyName])) {
                devstate[data[i].friendlyName]={}
            } 
        }
        return {devices:data, deviceState:devstate}

    }
    
    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/displayCategory/'+this.props.Category.toUpperCase())
 		    .then(result=>result.json())
 		    .then(data=>this.setBaseState(data))
            .then(result=>this.setState(result));
            
    }
    
    render() {
    
        const { classes } = this.props;
        const Category = components[this.props.Category];
        return (
            <div className={classes.list}>
                { 
                this.state.devices.map((device) =>
                    <Category key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceState={ this.state.deviceState[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                )}
            </div> 
        );
    }
}

DeviceList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceList);
