import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItem from '@material-ui/core/ListItem';


const styles = theme => ({
        
    root: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    expansionList: {
        paddingLeft: 4,
        paddingRight: 4,
        
    },
    halves: {
        width: '40%',
    },
    halfSlider: {
        width: '40%',
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flex: 1,
    },
    chip: {
        margin: theme.spacing.unit,
    },    
});

class Device extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: false,
            target: null,
            open: false,
            endpointId: '',
            lastmessage: '',
        };
    }

 
    static getDerivedStateFromProps(nextProps, prevState) {
        return Device.parseState(nextProps.wsUpdate, prevState.endpointId)
    
    }

    static parseState(data, endpointId) {
        
        var changes={}
        if (data===undefined) {
            return changes
        }
        
        if (data.hasOwnProperty('event')) {
            if (endpointId=='') {
                changes.endpointId=data.event.endpoint.endpointId
            }
            if ((endpointId==data.event.endpoint.endpointId) || changes.hasOwnProperty('endpointId')) {

                if (data.hasOwnProperty('context')){
                    for (var i = 0; i < data.context.properties.length; i++) {
                        else if (data.context.properties[i].name=='powerState') {
                            changes.powerState= data.context.properties[i].value=='ON'
                            //this.setState({powerState: data.context.properties[i].value=='ON'})
                        } 
                    }
                }
            }
        }
        return changes;
    }
    
    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/devices/'+this.props.friendlyName+'?stateReport')
 		    .then(result=>result.json())
 		    .then(data=>this.setState(Device.parseState(data,'')));
    }
 
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.friendlyName});
        var ops={"op":"set", "path":"discovery/"+this.props.friendlyName+"/PowerController/powerState", "value":event.target.checked};
        this.props.sender(JSON.stringify(ops));
    }

 
    render() {

        const { classes } = this.props;

        return (
            <ListItem className={classes.expansionList}>
                <FormControlLabel className={classes.halves} label={this.props.friendlyName} control={
                    <Switch color="primary" checked={this.state.powerState} onChange={this.handlePowerChange} />
                    }
                />             

            </ListItem>

        );
    }
}

Device.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Device);

