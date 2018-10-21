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

import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TuneIcon from '@material-ui/icons/Tune';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import PlaceIcon from '@material-ui/icons/Place';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@material-ui/core/TextField';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeviceSelect from "./deviceSelect"

const styles = theme => ({
        
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    list: {
        minWidth: 320,
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
        padding: 16,
        width: '100%',
    },
    dialogContent: {
        padding: 0,
    },
    sceneExpand: {
        padding: "0",
        marginBottom: 2,
    },
    areaInput: {
        marginTop:0,
        marginLeft: 16,
    },
    sec: {
        paddingRight: 16,
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class AutomationList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            automations: {},
            roomBrowser: false,
            objectBrowser: false,
            newAutomationName: '',
        }
    }


    runAutomation = name => {
        this.props.sendAlexaCommand(name, 'logic:scene:'+name, 'SceneController', 'Activate')
    }

    
    oldrunAutomation = name => {
        var actions=this.props.automations[name].actions
        for (var i = 0; i < actions.length; i++) {
            this.props.sendAlexaCommand(actions[i].deviceName, '', actions[i].controller, actions[i].command, actions[i].value)
        }
    }
    
    editNewAutomationName = (e) => {
        this.setState({ newAutomationName: e.target.value })
    }
    
    handleAddAutomation = () => {
        this.setState({ adding: true, editing: false})
    }

    handleEditAutomations = () => {
        this.setState({ adding: false, editing: true})
    }
    
    handleDoneAddEdit = () => {
        this.setState({ adding: false, editing: false})
    }

    handleAdd = (add) => {
        
        if (this.state.automations.hasOwnProperty(this.state.newAutomationName)) {
            console.log('An automation with that name already exists')
        } else {
            this.props.save(this.state.newAutomationName, []);
            this.setState({ newAutomationName: '', adding: false, editing: false });
        }

    }

    handleSelect = (automation) => {
        if (!this.state.editing) {
            this.props.select(automation)
        }
    }
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <React.Fragment>
            <DialogContent className={classes.dialogContent }>
                <List className={classes.List} >
                    { this.props.devicesByCategory('ACTIVITY_TRIGGER').map(scene => 
                        <ListItem className={classes.listItem} key={ scene['friendlyName']+'-reg' }>
                        { !this.state.editing ?
                            <Avatar onClick={ () => this.runAutomation(scene['friendlyName'])}>
                                <ListIcon />
                            </Avatar>
                        :
                            <Avatar onClick={ () => this.props.delete(scene['friendlyName'])}>
                                <CloseIcon />
                            </Avatar>
                        }
                            <ListItemText primary={scene['friendlyName']} secondary={this.props.automations[scene['friendlyName']]['actions'].length+' actions'}  onClick={() => this.handleSelect(scene['friendlyName'])}/>
                            {this.props.editMode ?
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Close" onClick={() => this.props.handleDeleteAutomation(scene['friendlyName'])}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null }
                        </ListItem>
                    )}

                    { this.state.adding ?
                        <form className={classes.container} noValidate autoComplete="off">
                        <ListItem className={classes.listItem}>
                            <Avatar>
                                <EditIcon />
                            </Avatar>
                            <TextField
                                className={classes.areaInput}
                                id="required"
                                label="Automation Name"
                                margin="normal"
                                value={this.state.newAutomationName}
                                onChange={(e) => this.editNewAutomationName(e)}
                            />
                            <ListItemSecondaryAction className={classes.sec}>
                                <IconButton aria-label="Confirm" onClick={(e) => this.handleAdd(true)}>
                                    <CheckIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        </form>
                    : null }
                </List>
            </DialogContent>
            <Divider />
            <DialogActions className={classes.dialogActions} >
                {!this.state.adding && !this.state.editing ?
                    <Button onClick={() => this.handleAddAutomation()} color="primary" autoFocus>ADD</Button>
                : null }
                {!this.state.adding && !this.state.editing ?
                    <Button onClick={() => this.handleEditAutomations()} color="primary" autoFocus>EDIT</Button>
                : null }
                {!this.state.adding && !this.state.editing ?
                    <Button onClick={() => this.props.close()} color="primary" autoFocus>CLOSE</Button>
                : null }
                {this.state.adding || this.state.editing ?
                    <Button onClick={() => this.handleDoneAddEdit()} color="primary" autoFocus>DONE</Button>
                : null }
            </DialogActions>
            </React.Fragment>
        )
    }
}

AutomationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutomationList);
