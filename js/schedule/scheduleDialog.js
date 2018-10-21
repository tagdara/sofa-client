import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
import TextField from  '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ScheduleEditor from './scheduleEditor'


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
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: "#6666FF",
    },
    chipPad: {
        margin: "0 4",
    }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ScheduleDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            schedule: {},
            typeSelect: "",
            daysType:"",
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
            intervalUnits: ['days','hours','minutes'],
            builder: false,
            deviceSelect: false,
            controllers: [],
            schedAction: false,
        };
    }   
    
    handleActionSelect = (deviceName, endpointId, controller, cmd) => {
        console.log(deviceName, endpointId, controller, cmd)
        this.setState({ schedAction: {'deviceName':deviceName, "endpointId":endpointId, "controller":controller, "command":cmd, "value":0}})
        this.setState({ deviceSelect:false})

    }
    
    componentDidMount() {  
  	    fetch('/list/logic/schedule')
 		    .then(result=>result.json())
            .then(data=>this.setState({schedule:data}))
  	    fetch('/controllercommands')
 		    .then(result=>result.json())
            .then(result=>this.setState({controllers:result}));

    }

    testClear = () => {
        this.setState({typeSelect: '',daysType:''})
    }
    
    closeEditor = () => {
        this.setState({ builder: false })
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
                                Schedule
                            </Typography>
                        </Toolbar>
          
                </DialogTitle>
                { this.state.builder ?
                    <ScheduleEditor close={this.closeEditor} devices={this.props.devices} controllers={this.state.controllers} schedule={this.state.schedule} / >
                :
                <React.Fragment>
                    <DialogContent>
                        <List className={classes.root}>
                        {
                        Object.keys(this.state.schedule).map((key, index) => (
                            <ListItem key={key} className={classes.listItem}>
                                <Avatar className={classes.waterIcon}><ScheduleIcon /></Avatar>
                                <ListItemText primary={key} secondary={"Every "+this.state.schedule[key]['interval']+" "+this.state.schedule[key]['intervalunit']+" starting "+this.state.schedule[key]['start']} />
                                <Switch color="primary" checked={this.state.schedule[key]['enabled']} onChange={ (e) => this.handlePowerChange(e) } />
                            </ListItem>
                        ))
                        }
                        </List>
                    </DialogContent>
                    <DialogActions className={classes.dialogActions} >
                        { this.state.builder && this.state.typeSelect ?
                        <Button onClick={(e) => this.testClear(e)} color="primary" autoFocus>CLEAR</Button>
                        : null }
                        <Button onClick={(e) => this.setState({builder:true})} color="primary" autoFocus>ADD</Button>
                        <Button onClick={(e) => this.props.close(e)} color="primary" autoFocus>OK</Button>
                    </DialogActions>
                </React.Fragment>
                }
            </Dialog>
        )
    }

}

ScheduleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(ScheduleDialog));
