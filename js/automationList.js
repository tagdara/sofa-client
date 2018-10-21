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
        this.props.sendAlexaCommand(name, 'logic:activity:'+name, 'SceneController', 'Activate')
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
            this.addAutomation(this.state.newAutomationName);
            this.setState({ newAutomationName: '', adding: false, editing: false });
        }

    }

    handleSelect = (automation) => {
        console.log('handle select', automation, this.state.editing)
        if (!this.state.editing) {
            this.props.select(automation)
        }
    }
    
    addAutomation = (automationName) => {

        var automations=this.state.automations
        automations[automationName]={'count': 0}
        console.log('Automatiions will be', automations)

        fetch('/add/logic/automation/'+automationName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(res=>console.log(res))
    } 
    
    deleteAutomation = (automationName) => {

        var automations=this.state.automations
        delete automations[automationName]

        fetch('/del/logic/automation/'+automationName, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([])
            })
            .then(res=>console.log(res))
            .then(result=>this.setState({automations:automations}));
    } 
    
    componentDidMount() {
  	    fetch('/list/logic/automationlist')
 		    .then(result=>result.json())
            .then(result=>this.setState({automations:result}));
    }
    
    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <React.Fragment>
            <DialogContent className={classes.dialogContent }>
                <List className={classes.List} >
                    { Object.keys(this.state.automations).map(automation => 
                        <ListItem className={classes.listItem} key={ automation+'-reg' }>
                        { !this.state.editing ?
                            <Avatar onClick={ () => this.runAutomation(automation)}>
                                <ListIcon />
                            </Avatar>
                        :
                            <Avatar onClick={ () => this.deleteAutomation(automation)}>
                                <CloseIcon />
                            </Avatar>
                        }
                            <ListItemText primary={automation} secondary={this.state.automations[automation].count+' actions'}  onClick={() => this.handleSelect(automation)}/>
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
