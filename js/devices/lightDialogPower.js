import React, { Component } from "react";
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


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
        background: "silver",
        color: "black",
        margin: theme.spacing.unit,
    },

    hotchip: {
        background: "orangeRed",
        color: "white",
        margin: theme.spacing.unit,
    },

    stackedLightControl: {
        paddingLeft: 16,
        paddingRight: 16,
        flex:1,
    },
    buttonsAndSlider: {
        paddingTop: 0,
        paddingRight: 28,
        paddingLeft: 10,
    },
    nameAndSwitch: {
        display: "flex",
        paddingRight: 0,
        paddingLeft: 10,
        alignItems: "center",
    },
    deviceName: {
        flex: 1,
    },
    listItemLabel: {
        paddingBottom: 0,
    },
    paperLight: {
        display: "flex",
        alignItems: "center",
        paddingLeft: 16,
    },
    chipLine: {
        paddingTop:0,
        paddingLeft:8,
        paddingRight:8,
    }
});

class LightDialogPower extends React.Component {
    

    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked, target: this.props.name});
        if (event.target.checked) {
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/PowerController/powerState", "command":"TurnOn", "value":event.target.checked}
        } else {
            var ops={"op":"set", "path":"discovery/"+this.props.name+"/PowerController/powerState", "command":"TurnOff", "value":event.target.checked}
        }
        this.props.sendMessage(JSON.stringify(ops));
    }; 


    render() {

        const { classes } = this.props;

        return (
                <List>
                    <ListItem>
                        <ListItemText primary="Power" onClick={ () => this.handleClickOpen()}/>
                        <ListItemSecondaryAction>
                            <Switch color="primary" checked={this.props.powerState} onChange={this.handlePowerChange} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
         );
    }
}

LightDialogPower.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightDialogPower);

