import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Light from './devices/light';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import Typography from '@material-ui/core/Typography';
import deepOrange from '@material-ui/core/colors/deepOrange';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
        boxSizing: "border-box",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "16 24 16 24",
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        alignItems: "center"
    },
    metadata: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    icon: {
        minWidth: 62,
        height: 62,
        width: 62,
        alignSelf: "flex-end",
    },
    off: {
        backgroundColor: "#777",
    },
    on: {
        backgroundColor: deepOrange[500],
    },
    countLabel: {
        padding: "8 16",
    }
    

});



class LightList extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            filter: 'on',
        }
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
    
    toggleFilter = event => {
        if (this.state.filter=='on') {
            this.setState({ filter:'all'})
        } else {
            this.setState({ filter:'on'}) 
        }
    }   
    
    render() {
    
        const { classes } = this.props;
        
        return (
            <div className={classes.list}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        { this.lightCount('on')>0 ? 
                        <Avatar className={classes.on} onClick={ () => this.toggleFilter('all') }><LightbulbOutlineIcon/></Avatar>
                        : 
                        <Avatar className={classes.off} onClick={ () => this.toggleFilter('all') }><LightbulbOutlineIcon/></Avatar>
                        }
                        { this.lightCount('on')>0 ? 
                            <Typography className={classes.countLabel} variant="subtitle1">{this.lightCount('on')} lights are on</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subtitle1">All lights off</Typography>
                        }
                    </CardContent>
                </Card>
                
                { 
                this.props.devices.map((device) =>
                    this.state.filter=='all' || String(this.props.deviceProperties[device.friendlyName].powerState).toLowerCase()==this.state.filter.toLowerCase() ?
                    <Light key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage} />
                    : null
                )}
            </div> 
        );
    }
}

LightList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LightList);
