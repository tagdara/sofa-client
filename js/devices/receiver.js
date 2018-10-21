import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

import ReceiverDialog from './receiverDialog';

const styles = theme => ({

    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: "0 8",
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "4 16",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    }, 
});

class Receiver extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            powerState: 'OFF',
            icon: '/react/images/receiver.png?v2',
            showdialog: false,
            inputs: {},
        };
        
        this.closeDialog = this.closeDialog.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        if (nextProps.deviceProperties.powerState !== prevState.powerState) {
            changes['powerState']=nextProps.deviceProperties.powerState
        }  
        return changes
    } 
    
    handlePowerChange = event => {
        this.setState({ powerState: event.target.checked });
        if (event.target.checked) {
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOn')
        } else {
            this.props.sendAlexaCommand(this.props.device.friendlyName, '', 'PowerController', 'TurnOff')
        }
    }; 

    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };  
    
    closeDialog = () => { 
        this.setState({ showdialog: false})
    } 
    
    getYamahaInput = inputname => {
        // this is to fix the hacky yamaha input naming system
        for (var yinput in this.state.inputs) {
            if (inputname==yinput) {
                return this.state.inputs[yinput]
            }
            if (inputname==yinput.replace('_','')) {
                return this.state.inputs[yinput]
            }
        }
        return inputname
                
    }

    componentDidMount() {

  	    fetch('/list/yamaha/inputs')
 		    .then(result=>result.json())
            .then(result=>this.setState({inputs:result}));
    }
    
    render() {

        const { classes } = this.props;

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <ListItem className={classes.listItem}>
                            <Avatar src={this.state.icon} onClick={ () => this.handleClickOpen()}/>
                            <ListItemText onClick={ () => this.handleClickOpen()} primary={this.props.name} secondary={this.getYamahaInput(this.props.deviceProperties.input) + " / "+ this.props.deviceProperties.surround}/>
                            <Switch color="primary" checked={this.state.powerState=='ON'} onChange={ (e) => this.handlePowerChange(e) } />
                        </ListItem>
                    </CardContent>
                    <ReceiverDialog input={this.getYamahaInput(this.props.deviceProperties.input)} inputs={this.state.inputs} sendAlexaCommand={this.props.sendAlexaCommand} showdialog={this.state.showdialog} closeDialog={this.closeDialog} name={this.props.name} device={ this.props.device } deviceProperties={ this.props.deviceProperties } sendMessage={ this.props.sendMessage } />
                </Card>
        );
    }
}

Receiver.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Receiver);
