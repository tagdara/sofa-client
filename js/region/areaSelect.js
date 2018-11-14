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

import DeviceGroupSelect from "../deviceSelect/deviceGroupSelect"
import AreaLine from "./areaLine"
import AreaAdd from "./areaAdd"
import AreaEditor from "./areaEditor"
import SofaDialogTitle from "../sofaDialogTitle"

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
    list: {
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


class AreaSelect extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            adding: false,
            selectedName: '',
            selectedDevices: [],
            areas: {},
            objectBrowser: false,
            region: {},
            editArea: false,
        }
        
        this.loadAreas = this.loadAreas.bind(this);
    }

    
    handleSave = (e) => {
        console.log(this.state.areamap)
        this.groupSaveChanges()
        this.props.close(e)
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
    
    getLightsByArea = (area) => {
        if (this.state.areas.hasOwnProperty(area)) {
            if (this.state.areas[area].hasOwnProperty('lights')) {
                return this.state.areas[area]['lights']
            }
        }

        return {}
    }
    
    isAreaInRegion = (area) => {
        if (this.state.region.hasOwnProperty('areas')) {
            if (this.state.region.areas.hasOwnProperty(area)) {
                return true
            }
        }
        return false
    }
    
    handleCheck = (event, item) => {
        console.log(event.target.checked,item,this.isAreaInRegion(item))
        if (event.target.checked) {
            if (!this.isAreaInRegion(item)) {
                var curreg=this.state.region
                curreg.areas[item]=this.state.areas[item]
            }
        } else {
            if (this.isAreaInRegion(item)) {
                var curreg=this.state.region
                delete curreg.areas[item]
                console.log('removed',item,curreg)
            }
        }
        this.setState({region: curreg}, () => this.regionSaveChanges(this.props.name))
    }
    
    regionSaveChanges = (region) => {
        fetch('/save/logic/region/'+region, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.region)
            })
    }
    
    delArea = (area) => {

        if (!this.state.areas.hasOwnProperty(area)) {
            console.log('That area doesnt exists')
        } else {
            fetch('/del/logic/area/'+area, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(this.loadAreas())
        }
    }
    
    addArea = (area) => {
        this.setState({add:false})
        if (this.state.areas.hasOwnProperty(area)) {
            console.log('That area already exists')
        } else {
            fetch('/add/logic/area/'+area, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "lights": {}, "scenes": {} })
            })
            .then(this.loadAreas())
        }
    }
    
    editArea = (area) => {
        this.setState({editArea: area})
    }
    
    loadAreas = () => {

        fetch('/list/logic/areas')
 		    .then(result=>result.json())
            .then(result=>this.setState({areas:result}));
    }

    componentDidMount() {

        console.log(Object.keys(this.state.region).length)
        this.loadAreas()
        
  	    fetch('/list/logic/region/'+this.props.name)
 		    .then(result=>result.json())
            .then(result=>this.setState({region:result}, () => console.log('cdm',this.props.name, this.state.region)))

    }

    render() {
        
        const { classes, name } = this.props;
        const { add, edit, areas, region, editArea } = this.state;
        
        return (
            <React.Fragment>
                <SofaDialogTitle title={name} />
                <DialogContent className={classes.dialogContent }>
                    <List className={classes.list} >
                    { editArea ?
                        <AreaEditor name={editArea} area={ areas[editArea] } loadAreas={this.loadAreas} />
                    :
                    <React.Fragment>
                    { Object.keys(areas).sort().map(name => 
                        <AreaLine key={name} name={name} inRegion={this.isAreaInRegion(name)} edit={edit} editArea={this.editArea}
                                    handleCheck={this.handleCheck} deviceCount={Object.keys(this.getLightsByArea(name)).length} />
                    )}
                    </React.Fragment>}
                    { add ?
                        <AreaAdd addArea={this.addArea} />
                    : null }
                    </List>
                </DialogContent>
                <DialogActions className={classes.dialogActions} >
                    { !add && !edit && !editArea ?
                        <React.Fragment>
                            <Button onClick={(e) => this.setState({ add:true }) } color="primary" autoFocus>ADD</Button> 
                            <Button onClick={(e) => this.setState({ edit:true }) } color="primary" autoFocus>EDIT</Button>
                            <Button onClick={(e) => this.props.close() } color="primary" autoFocus>OK</Button>
                        </React.Fragment>
                    :
                        <Button onClick={(e) => this.setState({ edit:false, add:false, editArea:false }) } color="primary" autoFocus>{ add ? "CANCEL": "OK" }</Button>
                    }
                </DialogActions>

                { this.state.objectBrowser ?
                <DeviceGroupSelect updateList={this.updateList} name={this.state.selectedName} selectedDevices={this.state.selectedDevices} open={this.state.objectBrowser} close={this.handleCloseObjectBrowser} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                    : null
                }
            </React.Fragment>
        )
    }

}

AreaSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaSelect);
