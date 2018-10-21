import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import ZoneGrid from './devices/zoneGrid';

const styles = theme => ({
        
    card: {
        display: 'flex',
        maxWidth: '480px',
        margin: 8,
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
    closed: {
        backgroundColor: "#6a6",
    },
    open: {
        backgroundColor: "#e66",
    },
    notready: {
        backgroundColor: "#ccc",
    },

    listItem: {
        padding: 16,
        width: '100%',
    },
});


class ZoneList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'open',
            showGrid: false,
        }
    }

    zoneReady = () => {
        
        if (Object.keys(this.props.deviceProperties).length==0) {
            return false
        } else {
            for (var dev in this.props.deviceProperties) {
                if (this.props.deviceProperties[dev].position==undefined) {
                    return false
                }
            }
        }
        return true
    }
    
    zoneCount = condition => {
        var count=0;
        for (var dev in this.props.deviceProperties) {
            if (condition=='all' || this.props.deviceProperties[dev].position==condition) {
                if (this.props.deviceProperties[dev].type=='Alarm') {
                    count=count+1
                }
            }
        }
        return count
    }
    
    handleGrid = (e) => {
        e.stopPropagation();
        this.setState({showGrid:true})
    }
    
    handleCloseGrid = (e) => {
        e.stopPropagation();
        this.setState({showGrid:false})
    }

    listOfOpenZones = () => {
        var openzones=''
        for (var dev in this.props.devices) {
            var device=this.props.devices[dev]
            if (this.props.deviceProperties[device.friendlyName].hasOwnProperty('position')) {
                if (this.props.deviceProperties[device.friendlyName].position=='open') {
                    if (this.props.deviceProperties[device.friendlyName].type=='Alarm') {
                        if (openzones) {
                            openzones=openzones+", "+device.friendlyName
                        } else {
                            openzones=device.friendlyName
                        }
                    }
                }
            }
        }
        return openzones
    }
 
    render() {
    
        const { classes } = this.props;
        
        return (
                <Card className={classes.card} onClick={ (e) => this.handleGrid(e)}>
                    <CardContent className={classes.content}>
                        { this.zoneReady() ?
                        <ListItem className={classes.listItem}>
                            { this.zoneCount('open')>0 ? 
                                <Avatar className={classes.open} ><PriorityHighIcon/></Avatar>
                            : 
                                <Avatar className={classes.closed} ><VerifiedUserIcon/></Avatar>
                            }
                            { this.zoneCount('open')>0 ? 
                                <ListItemText primary={this.zoneCount('open')+' zones are not secure'} secondary={this.listOfOpenZones()}/>
                            : 
                                <ListItemText primary={'All zones secure'}/>
                            }
                        </ListItem>
                        :
                        <ListItem className={classes.listItem}>
                            <Avatar className={classes.notready} ><PriorityHighIcon/></Avatar>
                            <ListItemText primary={'Waiting for zone data'}/>
                        </ListItem>
                        }
                    </CardContent>
                <ZoneGrid closeGrid={this.handleCloseGrid} showGrid={this.state.showGrid} zoneCount={this.zoneCount} deviceProperties={this.props.deviceProperties} devices={this.props.devices} />
            </Card>
        );
    }
}

ZoneList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ZoneList);
