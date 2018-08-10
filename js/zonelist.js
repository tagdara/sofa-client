import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Zone from './devices/zone';
import ZoneGrid from './devices/zoneGrid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

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
    },
    cardname: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        padding: 16,
        minWidth: 0,
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
    closed: {
        backgroundColor: "#6a6",
    },
    open: {
        backgroundColor: "#e66",
    },
    countLabel: {
        padding: "8 16",
    }
    

});


class ZoneList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: 'open',
            showGrid: false,
        }
    }

    
    zoneCount = condition => {
        var count=0;
        for (var dev in this.props.deviceProperties) {
            if (condition=='all' || this.props.deviceProperties[dev].position==condition) {
                count=count+1
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

 
    render() {
    
        const { classes } = this.props;
        
        return (
                <Card className={classes.card} onClick={ (e) => this.handleGrid(e)}>
                    <CardContent className={classes.content}>
                        { this.zoneCount('open')>0 ? 
                        <Avatar className={classes.open} ><PriorityHighIcon/></Avatar>
                        : 
                        <Avatar className={classes.closed} ><VerifiedUserIcon/></Avatar>
                        }
                        { this.zoneCount('open')>0 ? 
                            <Typography className={classes.countLabel} variant="subheading">{this.zoneCount('open')} zones are not secure</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subheading">All zones secure</Typography>
                        }
                    </CardContent>
                    { 
                    this.props.devices.map((device) =>
                        this.props.deviceProperties[device.friendlyName].position=='open' ?
                        <Zone key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                        : null
                    )}
                <ZoneGrid closeGrid={this.handleCloseGrid} showGrid={this.state.showGrid} zoneCount={this.zoneCount} deviceProperties={this.props.deviceProperties} devices={this.props.devices} />
            </Card>
        );
    }
}

ZoneList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ZoneList);
