import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SofaCard from './sofaCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import ZoneGrid from './devices/zoneGrid';
import { withData } from './dataContext';

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
        padding: "12 16",
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
        this.handleGrid = this.handleGrid.bind(this);
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
        const zoneOpen = this.zoneCount('open')>0;
        
        return (
                <SofaCard>
                    { this.zoneReady() ?
                    <ListItem className={classes.listItem} onClick={ (e) => this.handleGrid(e)}>
                        <Avatar className={ (zoneOpen) ? classes.open : classes.closed } >
                            { zoneOpen ? <PriorityHighIcon/> : <VerifiedUserIcon/> }
                        </Avatar>
                        <ListItemText primary={zoneOpen ? this.zoneCount('open')+' zones are not secure' : 'All zones secure' } secondary={this.listOfOpenZones()}/>
                    </ListItem>
                    :
                    <ListItem className={classes.listItem}>
                        <Avatar className={classes.notready} ><PriorityHighIcon/></Avatar>
                        <ListItemText primary={'Waiting for zone data'}/>
                    </ListItem>
                    }
                    <ZoneGrid close={this.handleCloseGrid} open={this.state.showGrid} zoneCount={this.zoneCount} deviceProperties={this.props.deviceProperties} devices={this.props.devices} />
                </SofaCard>
        );
    }
}

ZoneList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(ZoneList));
