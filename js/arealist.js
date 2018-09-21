import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import deepOrange from '@material-ui/core/colors/deepOrange';

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
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    card: {
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
 
});

class AreaList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
  	    fetch('/config/areamap')
 		    .then(result=>result.json())
            .then(result=>this.setState({areamap:result}));
  	    fetch('/config/scenemap')
 		    .then(result=>result.json())
            .then(data=>this.setState({sceneData: data}));
  	    fetch('/config/regionmap')
 		    .then(result=>result.json())
            .then(data=>this.confirmRegion(data));
    }
    
    render() {
        
        const { classes } = this.props;
        const { areas } = this.state;

        return (
            <div className={classes.areaList}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        { this.lightCount('on')>0 ? 
                        <Avatar className={classes.on}  onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                        : 
                        <Avatar className={classes.off}  onClick={ () => this.handleClickOpen() }><LightbulbOutlineIcon/></Avatar>
                        }
                        { this.lightCount('on')>0 ? 
                            <Typography className={classes.countLabel} variant="subheading" onClick={ () => this.handleClickOpen() }>{this.lightCount('on')} lights are on</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subheading" onClick={ () => this.handleClickOpen() }> All lights off</Typography>

                        }
                        <IconButton aria-label="Close" onClick={(e) => this.handleEdit()}>
                            <EditIcon />
                        </IconButton>
                    </CardContent>
                    {this.state.regionData.hasOwnProperty(this.state.region) ?
                    <AreaSelect name={this.state.region} updateList={this.saveRegion} open={this.state.showEditor} close={this.closeEditor} areas={this.state.areamap} selectedAreas={this.state.regionData[this.state.region] } />
                    : null }
                    <LightGrid name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devices } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                    { this.state.selectedArea ?
                        <AreaDialog open={this.state.showAreaDialog} close={this.closeAreaDialog} name={this.state.selectedArea} sceneData={this.sceneDataByArea(this.state.selectedArea)} devices={ this.devicesByArea(this.state.selectedArea)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(this.state.selectedArea)) } sendMessage={this.props.sendMessage} />
                    : null }
                </Card>
                {

                    this.state.regionData.hasOwnProperty(this.state.region) ?
                    this.state.regionData[this.state.region].map((name) => 
                        <Area sendAlexaCommand={this.props.sendAlexaCommand} key={ name } name={ name } sceneData={this.sceneDataByArea(name)} devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } selectArea={this.selectArea} sendMessage={this.props.sendMessage} ></Area>
                    )
                    : null 
                }
            </div> 
        );
    }
}

AreaList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AreaList);
