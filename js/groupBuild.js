import React from "react";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from  '@material-ui/core/Slide';
import Checkbox from  '@material-ui/core/Checkbox';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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

import DeviceGroupSelect from "./deviceSelect/deviceGroupSelect";
import SofaDialog from "../sofaDialog";

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
            .then(result=>this.setState({areamap:result}));

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
    
    updateList = (areaname,lightlist) => {
        var curmap=this.state.areamap
        curmap[areaname]['lights']=lightlist
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
                curmap[this.state.newAreaName]={'lights': []}
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
            var slights=this.state.areamap[name]['lights']
            this.setState( { selectedName: name, selectedDevices:slights, objectBrowser: true} )
        }
    }

    render() {
        
        const { classes, fullScreen  } = this.props;
        
        return (
            <SofaDialog open={this.props.open} onClose={this.props.close} title={"Areas"} >
                <DialogContent className={classes.dialogContent }>
                        <List className={classes.thermostatList} >
                    { 
                    this.state.areamap ?
                    Object.keys(this.state.areamap).map(name => 
                        <ListItem className={classes.listItem} key={ name+'-grp' } onClick={() => this.handleClick(name)}>
                            <ListItemIcon><PlaceIcon /></ListItemIcon>
                            <ListItemText primary={name} secondary={this.state.areamap[name]['lights'].length+' devices'} />
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
            </SofaDialog>
        )
    }

}

GroupBuild.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupBuild);
