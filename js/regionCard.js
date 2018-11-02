import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { withData } from './dataContext';
import RegionBuild from "./regionBuild"
import Area from './area';
import RegionSelect from './regionSelect';
import AreaDialog from './areaDialog';
import LightListDialog from './lightListDialog';
import LightGrid from './devices/lightgrid'
import SofaCard from './sofaCard';

const styles = theme => ({
        
    areaList: {
        padding: 8,
        minWidth: 320,
        maxWidth: '480px',
    },

    countLabel: {
        padding: "8 16",
        flexGrow: 1,
    },
    off: {
        backgroundColor: "#777",
    },
    on: {
        backgroundColor: theme.palette.primary.main,
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    list: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    }
});

class RegionCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            regionName: "main",
            regionrooms: [],
            arealist: {},
            regionlist: {},
            regionData: {},
            areamap: {},
            sceneData: {},
            showdialog: false,
            showEditor: false,
            showAraDialog: false,
            selectedAreas: [],
            selectedArea: '',
            region: {},
            areas: {},
            rooms: [],
            scenes: [],
        };
    }
    
    sceneDataByArea = area => {
        if (this.state.sceneData.hasOwnProperty(area)) {
            return this.state.sceneData[area]
        } else {
            return {}
        }
    }
    
    areaSceneList = area => {

        if (this.state.areas.hasOwnProperty(area)) {
            if (this.state.areas[area].hasOwnProperty('scenes')) {
                return this.state.areas[area].scenes
            }
        }
        return {}
    }
    
    areaShortcuts = area => {

        if (this.state.areas.hasOwnProperty(area)) {
            if (this.state.areas[area].hasOwnProperty('shortcuts')) {
                return this.state.areas[area].shortcuts
            }
        }
        return {}
    }
    
    scenesByArea = area => {
        var areascenes={}
        if (this.state.areas.hasOwnProperty(area)) {
            if (this.state.areas[area].hasOwnProperty('scenes')) {
                for (var scene in this.state.areas[area].scenes) {
                    areascenes[scene]=this.state.scenes[scene]
                }
            }
        }

        return areascenes
    }

    devicesByArea = area => {

        var ads=[]
        if (this.state.areas.hasOwnProperty(area)) {
            for (var dev in this.state.areas[area].lights) {
            //for (var i = 0; i < this.state.arealist[area].lights.length; i++) {
               // var dbn=this.props.deviceByName(this.state.arealist[area].lights)
                var dbn=this.props.deviceByName(dev)
                if (dbn) {
                    ads.push(dbn)
                }
            }
        }
        return ads
    }
 
    lightCount = condition => {
        var count=0;

        for (var dev in this.props.deviceProperties) {
            if (this.props.deviceProperties[dev].hasOwnProperty('powerState')) {
                if (condition.toLowerCase()=='all' || this.props.deviceProperties[dev].powerState.toLowerCase()==condition.toLowerCase()) {
                    count=count+1
                }
            }
        }
        return count
    }  
    
    handleEdit = () => {
        this.setState({ showEditor: true} )
    }

    handleRegionSelect = (region) => {
        this.setState({ showEditor: false, region: region},
            () => this.changeRegion(region))
    }
    
    closeRegionSelect = () => {
        this.setState({ showEditor: false} )
    }

    selectArea = (name) => {
        this.setState({ selectedArea: name, showAreaDialog: true} )
    }
    
    closeAreaDialog = () => {
        this.setState({ showAreaDialog: false} )
    }

   
    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };    
    
    closeDialog = () => {
        this.setState({ showdialog: false });
    };
    
    confirmRegion = (data) => {
        
        if (!data.hasOwnProperty(this.state.region)) {
            data[this.state.region]=[]
        }
        this.setState({regionData: data });
    }

    confirmRegionRooms = (data) => {
        
        if (!Array.isArray(data)) {
            data=[]
        }
        this.setState({regionrooms: data });
    }

    
    saveRegion = (name, data) => {
        
        var rdata=this.state.regionData
        rdata[name]=data
        this.setState({regionData: rdata})
        this.regionSaveChanges()
        
    }
    
    regionSaveChanges = (region) => {
        fetch('/save/logic/region'+region, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.region)
            })
    }
    
    changeRegion = (regionName) => {
        console.log('changing region to ',regionName)
        fetch('/list/logic/region/'+regionName)
            .then(result=>result.json())
            .then(result=>this.setState(result))

    }
    
    componentDidMount() {
        
  	    fetch('/list/logic/region/'+this.state.regionName)
 		    .then(result=>result.json())
 		    .then(result=> this.setState(result));
    }
    
    render() {
        
        const { classes } = this.props;
        const { areas } = this.state;
        const lightsOn = this.lightCount('on')>0;

        return (
                <SofaCard>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Avatar className={lightsOn ?classes.on : classes.off} onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                            <ListItemText primary={lightsOn ? this.lightCount('on')+" lights are on" : "All lights off" } onClick={ () => this.handleClickOpen() } />
                            <ListItemSecondaryAction>
                                <IconButton onClick={(e) => this.handleEdit()}>
                                    <ViewModuleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        { this.state.rooms.map((name) => 
                            <Area sendAlexaCommand={this.props.sendAlexaCommand} key={ name } name={ name } shortcuts={this.areaShortcuts(name)} scenes={this.areaSceneList(name)} sceneData={this.scenesByArea(name)} devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } selectArea={this.selectArea} ></Area>
                        )}
                    </List>
                    { this.state.showEditor ?
                        <RegionBuild handleRegionSelect={this.handleRegionSelect} open={this.state.showEditor} close={this.closeRegionSelect} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                    : null }
                    { this.state.showdialog ?
                        <LightGrid sendAlexaCommand={this.props.sendAlexaCommand} name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devicesByCategory('LIGHT') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('LIGHT')) } />
                    : null }
                    { this.state.selectedArea ?
                        <AreaDialog sendAlexaCommand={this.props.sendAlexaCommand} open={this.state.showAreaDialog} close={this.closeAreaDialog} name={this.state.selectedArea} sceneData={this.sceneDataByArea(this.state.selectedArea)} devices={ this.devicesByArea(this.state.selectedArea)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(this.state.selectedArea)) } sendMessage={this.props.sendMessage} />
                    : null }
                </SofaCard>
        );
    }
}

RegionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(RegionCard));
