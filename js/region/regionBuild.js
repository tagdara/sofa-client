import React from "react";
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

import RegionList from "./regionList"
import AreaSelect from "./areaSelect"
import SofaDialog from "../sofaDialog"

const styles = theme => ({
        
    dialogActions: {
        paddingBottom: "env(safe-area-inset-bottom)",
    },
});

class RegionSelect extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            add: false,
            selectedName: '',
            selectedDevices: [],
            areamap: {},
            regions: {},
            roomBrowser: false,
            objectBrowser: false,
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
        console.log('hre',region)
        this.setState({roomBrowser:true, selectedRegion: region})
    }


    render() {
        
        const { classes  } = this.props;
        
        return (
            <SofaDialog open={this.props.open} close={this.props.close} title="Regions" >
                { this.state.roomBrowser ?
                    <AreaSelect name={this.state.selectedRegion} close={this.handleCloseRoomBrowser} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                : 
                    <RegionList edit={this.state.edit} add={this.state.add} doneEditing={this.doneEditing} handleRegionEdit={this.handleRegionEdit} handleRegionSelect={this.props.handleRegionSelect} />
                }
                <Divider />
                <DialogActions className={classes.dialogActions} >
                    { !this.state.edit && !this.state.add ?
                        <React.Fragment>
                            <Button onClick={(e) => this.setState({ add: true}) } color="primary" autoFocus>ADD</Button>
                            <Button onClick={(e) => this.setState({ edit: true}) } color="primary" autoFocus>EDIT</Button>
                            <Button onClick={(e) => this.handleSave(e)} color="primary" autoFocus>OK</Button>
                        </React.Fragment>
                    : 
                        <Button onClick={(e) => this.setState({ add: false, edit: false}) } color="primary" autoFocus>DONE</Button> 
                    }
                </DialogActions>
            </SofaDialog>
        )
    }

}

RegionSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegionSelect);
