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
                { this.state.editing ?
                    <AutomationEditor sendAlexaCommand={this.props.sendAlexaCommand} devices={this.props.devices} name={this.state.selectedAutomation} doneEditing={this.handleDoneEditing} controllers={this.state.controllers} />
                :
                    <AutomationList close={this.handleClose} sendAlexaCommand={this.props.sendAlexaCommand} save={this.saveAutomationActions} delete={this.handleDeleteAutomation} editMode={this.state.adding} doneEditing={this.doneAdding} controllers={this.state.controllers} select={this.handleSelectAutomation} sendMessage={this.props.sendMessage} />
                }
            </Dialog>
        )
    }
}

AutomationBuilder.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(AutomationBuilder));
