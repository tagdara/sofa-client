import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import PlaceIcon from '@material-ui/icons/Place';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AutomationList from './automationList';
import AutomationEditor from './automationEditor';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    thermostatList: {
        width: "100%",
    },
    tabTitle: {
        backgroundColor: theme.palette.primary[700],
        padding: 0,
        paddingTop: "env(safe-area-inset-top)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    listItem: {
        padding: "8 0",
        width: '100%',
    },
    dialogContent: {
        padding: 0,
    },
    sceneExpand: {
        padding: "0",
        marginBottom: 2,
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AutomationBuilder extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            controllers: {},
            automations: {},
            newAutomationName: '',
            addingAction: false,
            adding: false,
            editing: false,
            selectedAutomation: '',
            regionData: {},
            areamap: {},
            sceneData: {},

        }
    }
    

    handleClose = () => {
        this.setState({editing: false, adding: false})
        this.props.close()
        
    }

    handleEditAutomation = () => {
        this.setState({addingAction:true})
    }

    handleDoneEditAutomation = () => {
        this.setState({addingAction:false, editing:false, adding: false})
    }


    handleDoneEditing = () => {
        this.setState({editing:false})
    }

    handleSelectAutomation = (name) => {
        this.setState({adding: false, editing:true, selectedAutomation:name})
    }

    handleAddAutomation = () => {
        this.setState({adding:true})
    }

    handleDeleteAutomation = (name) => {
        var automations=this.state.automations
        delete automations[name]

        this.setState({automations:automations},
            () => this.saveAutomations()
        );
    }

    runAutomation = name => {
        var actions=this.automations[name]['actions']
        for (var i = 0; i < actions.length; i++) {
            var ops={"op":"set", "path":"discovery/"+actions[i].deviceName+"/"+actions[i].controller, "command":actions[i].command, "value":actions[i].value}
            this.props.sendMessage(JSON.stringify(ops));
        }
    }; 
    
    editNewAutomationName = (e) => {
        this.setState({ newAutomationnName: e.target.value })
    }

    saveNewAutomation = () => {
        var automations=this.state.automations
        if (automations.hasOwnProperty(this.state.newAutomationName)) {
            console.log('Automation Already exists')
        } else {
            automations[this.state.newAutomationName]={'actions': [], 'lastrun':'never'}
            this.setState({automations:automations, newAutomationName:'', adding: false},
                () => this.saveAutomations()
            );
        }
    }
    
    saveAutomationActions = (automationName, actions) => {
        var automations=this.state.automations

        automations[automationName]={'actions': actions, 'lastrun':'never'}
        this.setState({automations:automations, addingAction: false},
            () => this.saveAutomations()
        );

    }
    
    saveAutomations = () => {
        fetch('/config/automations', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.automations)
            })
            .then(res=>console.log(res))
    }

    componentDidMount() {
  	    fetch('/config/automations')
 		    .then(result=>result.json())
            .then(result=>this.setState({automations:result}));

  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));

  	    fetch('/config/areamap')
 		    .then(result=>result.json())
            .then(result=>this.setState({areamap:result}));

  	    fetch('/config/scenemap')
 		    .then(result=>result.json())
            .then(data=>this.setState({sceneData: data}));

    }

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <Dialog 
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'sm'}
                open={this.props.open}  
                onClose={this.props.close}
                TransitionComponent={Transition}
                className={fullScreen ? classes.fullDialog : classes.normalDialog }
            >
                <DialogTitle className={classes.tabTitle}>

                        <Toolbar className={classes.appBar} elevation={0}>
                            <Typography variant="title" color="inherit" className={classes.dialogTitle}>
                                Automations
                            </Typography>
                        </Toolbar>
          
                </DialogTitle>
                <Divider />
                    { !this.state.editing ?
                        <AutomationList  sendAlexaCommand={this.props.sendAlexaCommand} devices={this.props.devices} automations={this.state.automations} delete={this.handleDeleteAutomation} editMode={this.state.adding} doneEditing={this.doneAdding} controllers={this.state.controllers} select={this.handleSelectAutomation} sendMessage={this.props.sendMessage} />
                    :
                        <AutomationEditor sendAlexaCommand={this.props.sendAlexaCommand} devices={this.props.devices} name={this.state.selectedAutomation} editMode={this.state.addingAction} doneEditing={this.doneEditing} controllers={this.state.controllers} actions={this.state.automations[this.state.selectedAutomation]['actions']} save={this.saveAutomationActions} />
                    }
                <Divider />
                <DialogActions className={classes.dialogActions} >
                {!this.state.adding && ! this.state.editing ?
                    <Button onClick={(e) => this.handleAddAutomation(e)} color="primary" autoFocus>ADD</Button>
                : null }
                {!this.state.adding && this.state.editing ?
                    <Button onClick={(e) => this.handleEditAutomation(e)} color="primary" autoFocus>ADD ACTION</Button>
                : null }

                {!this.state.adding && this.state.editing ?
                    <Button onClick={(e) => this.handleDoneEditAutomation(e)} color="primary" autoFocus>BACK</Button>
                : null }

                    <Button onClick={(e) => this.handleClose(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        )
    }

}

AutomationBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(AutomationBuilder));
