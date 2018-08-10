
import React from "react";
import Area from './area';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import LightListDialog from './lightListDialog';
import LightGrid from './devices/lightgrid'
import deepOrange from '@material-ui/core/colors/deepOrange';

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
            areamap: {},
            showdialog: false,
        };
    }
    
    devicesByArea = area => {

        var ads=[]
        for (var i = 0; i < this.state.areamap[area].lights.length; i++) {
            var dbn=this.props.deviceByName(this.state.areamap[area].lights[i])
            if (dbn) {
                ads.push(dbn)
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
    
    handleClickOpen = () => {
        this.setState({ showdialog: true });
    };    
    
    closeDialog = () => {
        this.setState({ showdialog: false });
    };  
    
    componentDidMount() {
  	    fetch('/data/areamap')
 		    .then(result=>result.json())
            .then(result=>this.setState({areamap:result}));
    }
    
    render() {
        
        const { classes } = this.props;
        const { areas } = this.state;

        return (
            <div className={classes.areaList}>
                <Card className={classes.card}>
                    <CardContent className={classes.content} onClick={ () => this.handleClickOpen() } >
                        { this.lightCount('on')>0 ? 
                        <Avatar className={classes.on} ><LightbulbOutlineIcon/></Avatar>
                        : 
                        <Avatar className={classes.off} ><LightbulbOutlineIcon/></Avatar>
                        }
                        { this.lightCount('on')>0 ? 
                            <Typography className={classes.countLabel} variant="subheading">{this.lightCount('on')} lights are on</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subheading">All lights off</Typography>
                        }
                    </CardContent>
                    <LightGrid name={'all'} lightCount={this.lightCount} closeGrid={this.closeDialog} showGrid={this.state.showdialog} key='lightlist' filter='ON' Category='Light' devices={ this.props.devices } deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage} />
                </Card>
                {
                    this.state.areamap ?
                    Object.keys(this.state.areamap).map(name => 
                        <Area key={ name } name={ name } devices={ this.devicesByArea(name)} deviceProperties={ this.props.propertiesFromDevices(this.devicesByArea(name)) } sendMessage={this.props.sendMessage} ></Area>
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
