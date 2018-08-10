import React from "react";
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Zone from './devices/zone';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import WarningIcon from '@material-ui/icons/Warning';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
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
        }
    }

    
    zoneCount = condition => {
        
        console.log('getting count for ',condition,this.props.deviceProperties)
        
        var count=0;
        for (var dev in this.props.deviceProperties) {
            if (condition=='all' || this.props.deviceProperties[dev].position==condition) {
                count=count+1
            }
        }
        console.log('count:', count)
        return count
    }
    
    toggleFilter = event => {
        console.log('Setting filter to ',event)
        this.setState({ filter:'all'})
    }
 
    render() {
    
        const { classes } = this.props;
        
        return (
            <div className={classes.list}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        { this.zoneCount('open')>0 ? 
                        <Avatar className={classes.open} onClick={ () => this.toggleFilter('all') }><WarningIcon/></Avatar>
                        : 
                        <Avatar className={classes.closed} onClick={ () => this.toggleFilter('all') }><VerifiedUserIcon/></Avatar>
                        }
                        { this.zoneCount('open')>0 ? 
                            <Typography className={classes.countLabel} variant="subheading">{this.zoneCount('open')} zones are not secure</Typography>
                            : 
                            <Typography className={classes.countLabel} variant="subheading">All zones secure</Typography>
                        }
                    </CardContent>
                </Card>


                { 
                this.props.devices.map((device) =>
                    this.state.filter=='all' || this.props.deviceProperties[device.friendlyName].position==this.state.filter ?
                    <Zone key={ device.endpointId } name={ device.friendlyName } filter={ this.props.filter} device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sender={this.props.sender} updateDevice={this.props.updateDevice} />
                    : null
                )}
            </div> 
        );
    }
}

ZoneList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ZoneList);
