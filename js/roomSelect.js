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
import Checkbox from  '@material-ui/core/Checkbox';

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

import DeviceSelect from "./deviceSelect"

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
    }

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class GroupBuild extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            objectBrowser: false,
            newAreaName: 'new',
        }
    }

    
    handleSave = (e) => {
        console.log(this.state.areamap)
        this.groupSaveChanges()
        this.props.close(e)
    }
    
    componentDidMount() {
  	    fetch('/config/areamap')
 		    .then(result=>result.json())
            .then(result=>this.checkOldFormat(result));

    }
    
    checkOldFormat = (areadata) => {
        console.log('areadata:',areadata)
        for (var room in areadata) {
            if (Array.isArray(areadata[room]['lights'])) {
                console.log('Old format: ',room)
                var nf={}
                for (var i = 0; i < areadata[room]['lights'].length; i++) {
                    nf[areadata[room]['lights'][i]] = { 'endpointId' : this.deviceByName(areadata[room]['lights'][i])['endpointId'] }
                }
                areadata[room]['lights']=nf
            } else {
                var bf={}
                for (var dev in areadata[room]['lights']) {
                    console.log('dev',dev,this.deviceByName(dev))
                    var devdata=this.deviceByName(dev)
                    if (devdata) {
                        bf[dev] = { 'endpointId' : this.deviceByName(dev)['endpointId'] }
                    }
                }
                areadata[room]['lights']=bf
            }

        }
        
        console.log('Formatted areadata:', areadata)
        this.setState({areamap:areadata})
    }
    
    groupSaveChanges = () => {
        
        fetch('/config/areamap', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.areamap)
            })
            .then(res=>console.log(res))
    }
    
    deviceByName = devname => {
        
        for (var i = 0; i < this.props.devices.length; i++) {
            if (this.props.devices[i].friendlyName==devname) {
                return this.props.devices[i]
            }
        }
    }
    
    updateList = (areaname,lightlist) => {
        var curmap=this.state.areamap
        var lightdata={}
        
        for (var i = 0; i < lightlist.length; i++) {
            lightdata[lightlist[i]]={ 'endpointId' : this.deviceByName(lightlist[i])['endpointId']}
        }
            
        curmap[areaname]['lights']=lightdata
        this.setState({areamap:curmap})
    }
    
    editNewAreaName = (e) => {
        this.setState({ newAreaName: e.target.value })
    }
    
    handleAdding = () => {
        this.setState({ adding: true})
    }
    
    handleDelete = (delarea) => {
        var curmap=this.state.areamap;
        delete curmap[delarea]
        this.setState({areamap: curmap})
    }
    
    handleDoneAdding = (add) => {
        if (add) {
            if (this.state.areamap.hasOwnProperty(this.state.newAreaName)) {
                console.log('That area already exists')
            } else {
                var curmap=this.state.areamap;
                curmap[this.state.newAreaName]={'lights': {}}
                this.setState({areamap: curmap})
            }
        }
        this.setState({ adding: false})
    }
     
    handleObjectBrowser = () => {
        this.setState({ objectBrowser: true });
    };

    handleCloseObjectBrowser = () => {
        this.setState({ objectBrowser: false });
    };
    
    handleClick = (name) => {
        if (!this.state.adding) {
            console.log(name,this.state.areamap[name]['lights'])
            var slights=Object.keys(this.state.areamap[name]['lights'])
            this.setState( { selectedName: name, selectedDevices:slights, objectBrowser: true} )
        }
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
                                Areas
                            </Typography>
                        </Toolbar>
          
                </DialogTitle>
                <Divider />
                <DialogContent className={classes.dialogContent }>
                        <List className={classes.thermostatList} >
                    { 
                    this.state.areamap ?
                    Object.keys(this.state.areamap).map(name => 
                        <ListItem className={classes.listItem} key={ name+'-grp' } onClick={() => this.handleClick(name)}>
                            <ListItemIcon><PlaceIcon /></ListItemIcon>
                            <ListItemText primary={name} secondary={Object.keys(this.state.areamap[name]['lights']).length+' devices'} />
                            {this.state.adding ?
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Close" onClick={() => this.handleDelete(name)}>
                                    <CloseIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            : null }
                        </ListItem>
                    )
                    : null
                    }
                    { this.state.adding ?
                        <form className={classes.container} noValidate autoComplete="off">
                        <ListItem className={classes.listItem}>
                            <ListItemIcon><EditIcon /></ListItemIcon>
                            <TextField
                                className={classes.areaInput}
                                id="required"
                                label="Area name"
                                margin="normal"
                                value={this.state.newAreaName}
                                onChange={(e) => this.editNewAreaName(e)}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Confirm" onClick={(e) => this.handleDoneAdding(true)}>
                                    <CheckIcon />
                                </IconButton>
                                <IconButton aria-label="Close" onClick={(e) => this.handleDoneAdding(false)}>
                                    <CloseIcon />
                                </IconButton>
                                </ListItemSecondaryAction>
                        </ListItem>
                        </form>
                    : null }
                    </List>
                </DialogContent>
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    { !this.state.adding ?
                    <Button onClick={(e) => this.handleAdding(e)} color="primary" autoFocus>ADD</Button>
                    : null }
                    <Button onClick={(e) => this.handleSave(e)} color="primary" autoFocus>OK</Button>
                </DialogActions>
                { this.state.objectBrowser ?
                <DeviceSelect updateList={this.updateList} name={this.state.selectedName} selectedDevices={this.state.selectedDevices} open={this.state.objectBrowser} close={this.handleCloseObjectBrowser} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                    : null
                }
            </Dialog>
        )
    }

}

GroupBuild.propTypes = {
    classes: PropTypes.object.isRequired,
    fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(withMobileDialog()(GroupBuild));
