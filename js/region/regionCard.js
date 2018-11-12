import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

import { withData } from '../DataContext/withData';
import RegionBuild from "./regionBuild"
import Area from '../area/area';
import RegionDialog from './regionDialog';
import AreaDialog from '../area/areaDialog';
import LightListDialog from '../light/lightListDialog';
import LightGrid from '../light/lightgrid'
import SofaCard from '../sofaCard';

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
            regionName: "Main",
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
            scenes: [],
            regionSelect: false,
        };
    }
    
    sceneDataByArea = area => {
        
        var areascenes={}
        if (this.state.areas.hasOwnProperty(area)) {
            for (var scene in this.state.areas[area].scenes) {
                if (this.state.scenes.hasOwnProperty(scene)) {
                    areascenes[scene]=this.state.scenes[scene]
                }
            }
        }   
        return areascenes
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

    shortcutsByArea = area => {

        if (this.state.areas.hasOwnProperty(area)) {
            if (this.state.areas[area].hasOwnProperty('shortcuts')) {
                return this.state.areas[area].shortcuts
            }
        }
        return {}
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
                if (this.props.deviceProperties[dev].powerState) {
                    if (condition.toLowerCase()=='all' || this.props.deviceProperties[dev].powerState.toLowerCase()==condition.toLowerCase()) {
                        count=count+1
                    }
                }
            }
        }
        return count
    }  
    
    handleEdit = () => {
        this.setState({ showEditor: true} )
    }

    selectRegion = (region) => {
        
        this.setState({ regionSelect: false })
        if (region) { 
            this.setState({ region: region}) 
        } else {
            region = this.state.region
        }
        
        fetch('/list/logic/region/'+region)
            .then(result=>result.json())
            .then(result=>this.setState(result))
    }
    
    closeRegionSelect = () => {
        this.setState({ regionSelect: false} )
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

    componentDidMount() {
        console.log('regioncard',this)
  	    fetch('/list/logic/region/'+this.state.regionName)
 		    .then(result=>result.json())
 		    .then(result=> this.setState(result));
    }
    
    render() {
        
        const { classes } = this.props;
        const { areas, regionSelect } = this.state;
        const lightsOn = this.lightCount('on')>0;

        return (
                <SofaCard>
                    <List className={classes.list}>
                        <ListItem className={classes.listItem}>
                            <Avatar className={lightsOn ?classes.on : classes.off} onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                            <ListItemText primary={lightsOn ? this.lightCount('on')+" lights are on" : "All lights off" } onClick={ () => this.handleClickOpen() } />
                            <ListItemSecondaryAction>
                                <IconButton onClick={(e) => this.setState({regionSelect:true})}>
                                    <ViewModuleIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        { Object.keys(areas).map((name) => 
                            <Area sendAlexaCommand={this.props.sendAlexaCommand} key={ name } name={ name } shortcuts={this.areaShortcuts(name)} scenes={this.areaSceneList(name)} sceneData={this.scenesByArea(name)} devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } selectArea={this.selectArea} ></Area>
                        )}
                    </List>
                    { this.state.regionSelect ?
                        <RegionDialog selectRegion={this.selectRegion} open={this.state.regionSelect} close={this.closeRegionSelect} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                    : null }
                    { this.state.showdialog ?
                        <LightGrid sendAlexaCommand={this.props.sendAlexaCommand} name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devicesByCategory('LIGHT') } deviceProperties={ this.props.propertiesFromDevices(this.props.devicesByCategory('LIGHT')) } />
                    : null }
                    { this.state.selectedArea ?
                        <AreaDialog shortcuts={this.shortcutsByArea(this.state.selectedArea)} sendAlexaCommand={this.props.sendAlexaCommand} 
                                    open={this.state.showAreaDialog} close={this.closeAreaDialog} name={this.state.selectedArea} 
                                    sceneData={this.sceneDataByArea(this.state.selectedArea)} devices={ this.devicesByArea(this.state.selectedArea)} 
                                    deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(this.state.selectedArea)) }  />
                    : null }
                </SofaCard>
        );
    }
}

RegionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(RegionCard));
