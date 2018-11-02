import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
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

import DeviceSelect from "./deviceSelect"
import RegionList from "./regionList"
import RoomSelect from "./roomSelect"
import SofaDialog from "./sofaDialog"

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
        backgroundColor: theme.palette.primary.main,
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

class RegionBuild extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            regions: {},
            roomBrowser: false,
            objectBrowser: false,
            newRegionName: '',
            editMode: false,
        }
    }

    
    handleSave = (e) => {
        this.groupSaveChanges()
        this.props.close(e)
    }
    
    componentDidMount() {
  	    fetch('/config/regions')
 		    .then(result=>result.json())
            .then(result=>this.setState({regions:result}));
  	    fetch('/config/areamap')
 		    .then(result=>result.json())
            .then(result=>this.setState({areamap:result}));

    }

    saveRegions = () => {
        fetch('/config/regions', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.regions)
            })
            .then(res=>console.log(res))
    }

    
    groupSaveChanges = () => {
        
        fetch('/config/regions', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.regions)
            })

    }
    
    updateList = (regionname, roomlist) => {
        var curmap=this.state.regions
        curmap[regionname]['rooms']=roomlist
        this.setState({regions:curmap})
    }

    enableEditMode = () => {
        this.setState({ editMode: true})
    }
    
    disableEditMode = () => {
        this.setState({ editMode: false})
    }
     
     
    handleObjectBrowser = () => {
        this.setState({ roomBrowser: true });
    };

    handleCloseObjectBrowser = () => {
        this.setState({ roomBrowser: false });
    };
    
    handleCloseRoomBrowser = () => {
        this.setState({ roomBrowser: false });
    };
    
    handleClick = (name) => {
        if (!this.state.adding) {
            if (!this.state.regions[name].hasOwnProperty('rooms')) {
                var srooms=[]
            } else {
                var srooms=this.state.regions[name]['rooms']
            }
            this.setState( { selectedRegion: name, selectedRooms:srooms, roomBrowser: true} )
        }
    }
    
    handleRegionEdit = (region) => {
        this.setState({roomBrowser:true, selectedRegion: region})
    }


    render() {
        
        const { classes  } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title="Regions" >
                { this.state.roomBrowser ?
                    <RoomSelect updateList={this.updateList} name={this.state.selectedRegion} selectedRooms={this.state.selectedRooms} open={this.state.roomBrowser} close={this.handleCloseRoomBrowser} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                : 
                    <RegionList editMode={this.state.editMode} doneEditing={this.doneEditing} handleRegionEdit={this.handleRegionEdit} handleRegionSelect={this.props.handleRegionSelect} />
                }
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    { !this.state.editMode ?
                    <Button onClick={(e) => this.enableEditMode(e)} color="primary" autoFocus>EDIT</Button>
                    : <Button onClick={(e) => this.disableEditMode(e)} color="primary" autoFocus>DONE</Button> }
                    
                    { !this.state.editMode ?
                    <Button onClick={(e) => this.handleSave(e)} color="primary" autoFocus>OK</Button>
                    : null }
                </DialogActions>
            </SofaDialog>
        )
    }

}

RegionBuild.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionBuild);
