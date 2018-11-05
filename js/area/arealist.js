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
import AreaSelect from './areaSelect';
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
        backgroundColor: theme.palette.primary.dark,
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

class AreaList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
            region: 'main',
            selectedArea: '',
        };
    }
    
    sceneDataByArea = area => {
        if (this.state.sceneData.hasOwnProperty(area)) {
            return this.state.sceneData[area]
        } else {
            return {}
        }
    }
    
    devicesByArea = area => {

        var ads=[]
        if (this.state.arealist.hasOwnProperty(area)) {
            for (var dev in this.state.arealist[area].lights) {
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
    
    regionSaveChanges = () => {
        fetch('/config/regionmap', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.regionData)
            })
    }
    
    changeRegion = (region) => {
        fetch('/list/logic/region/'+region)
            .then(result=>result.json())
            .then(data=>this.confirmRegionRooms(data));
    }
    
    componentDidMount() {
        
  	    fetch('/list/logic/region/'+this.state.region)
 		    .then(result=>result.json())
            .then(data=>this.confirmRegionRooms(data));
  	    fetch('/list/logic/arealist')
 		    .then(result=>result.json())
            .then(result=>this.setState({arealist:result}));
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
                        { this.state.regionrooms.map((name) => 
                            <Area sendAlexaCommand={this.props.sendAlexaCommand} key={ name } name={ name }  devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } selectArea={this.selectArea} sendMessage={this.props.sendMessage} ></Area>
                        )}
                    </List>
                    <RegionBuild handleRegionSelect={this.handleRegionSelect} open={this.state.showEditor} close={this.closeRegionSelect} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
                    
                    {this.state.regionData.hasOwnProperty(this.state.region) ?
                        <AreaSelect name={this.state.region} updateList={this.saveRegion} open={this.state.showEditor} close={this.closeEditor} areas={this.state.areamap} selectedAreas={this.state.regionData[this.state.region] } />
                    : null }
                    { this.state.showdialog ?
                        <LightGrid sendAlexaCommand={this.props.sendAlexaCommand} name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devices } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                    : null }
                    { this.state.selectedArea ?
                        <AreaDialog sendAlexaCommand={this.props.sendAlexaCommand} open={this.state.showAreaDialog} close={this.closeAreaDialog} name={this.state.selectedArea} sceneData={this.sceneDataByArea(this.state.selectedArea)} devices={ this.devicesByArea(this.state.selectedArea)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(this.state.selectedArea)) } sendMessage={this.props.sendMessage} />
                    : null }
                </SofaCard>
        );
    }
}

AreaList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(AreaList));
