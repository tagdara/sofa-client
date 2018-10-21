import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Area from './area';
import AreaSelect from './areaSelect';
import AreaDialog from './areaDialog';
import LightListDialog from './lightListDialog';
import LightGrid from './devices/lightgrid'

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';


const styles = theme => ({
        
    areaList: {
        padding: 8,
        minWidth: 320,
        maxWidth: '480px',
    },
    card: {
        maxWidth: '480px',
        minWidth: '320px',
        flexDirection: "row",
        margin: 8,
        boxSizing: "border-box",
        justifyContent: "space-between",
    },


    xxcard: {
        display: 'flex',
        maxWidth: '480px',
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },

    xcontent: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    xcard: {
        display: 'flex',
        maxWidth: '480px',
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 16,
    },
    countLabel: {
        padding: "8 16",
        flexGrow: 1,
    },
    off: {
        backgroundColor: "#777",
    },
    on: {
        backgroundColor: deepOrange[500],
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    areaList: {
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
    
    xxdevicesByArea = area => {

        var ads=[]
        if (this.state.areamap.hasOwnProperty(area)) {
            for (var i = 0; i < this.state.areamap[area].lights.length; i++) {
                var dbn=this.props.deviceByName(this.state.areamap[area].lights[i])
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
    
    closeEditor = () => {
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
            .then(res=>console.log(res))
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

        return (
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <List className={classes.areaList}>
                        <ListItem className={classes.listItem}>
                            { this.lightCount('on')>0 ? 
                                <Avatar className={classes.on} onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                            : 
                                <Avatar className={classes.off} onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                            }
                            { this.lightCount('on')>0 ? 
                                <ListItemText primary={this.lightCount('on')+" lights are on"} onClick={ () => this.handleClickOpen() } />
                            :
                                <ListItemText primary={"All lights off"} onClick={ () => this.handleClickOpen() } />
                            }
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete">
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Close" onClick={(e) => this.handleEdit()}>
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        { this.state.regionrooms.map((name) => 
                            <Area sendAlexaCommand={this.props.sendAlexaCommand} key={ name } name={ name }  devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } selectArea={this.selectArea} sendMessage={this.props.sendMessage} ></Area>
                        )}
                        </List>
                    {this.state.regionData.hasOwnProperty(this.state.region) ?
                    <AreaSelect name={this.state.region} updateList={this.saveRegion} open={this.state.showEditor} close={this.closeEditor} areas={this.state.areamap} selectedAreas={this.state.regionData[this.state.region] } />
                    : null }
                    { this.state.showdialog ?
                    <LightGrid sendAlexaCommand={this.props.sendAlexaCommand} name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devices } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                    : null }
                    { this.state.selectedArea ?
                        <AreaDialog sendAlexaCommand={this.props.sendAlexaCommand} open={this.state.showAreaDialog} close={this.closeAreaDialog} name={this.state.selectedArea} sceneData={this.sceneDataByArea(this.state.selectedArea)} devices={ this.devicesByArea(this.state.selectedArea)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(this.state.selectedArea)) } sendMessage={this.props.sendMessage} />
                    : null }
                    </CardContent>
                </Card>
        );
    }
}

AreaList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaList);
