
import React from "react";
import Sonos from './devices/sonos';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
        
    playerList: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class PlayerList extends React.Component {
     
    constructor(props) {
        super(props);

        this.state = {
            players: {},
            playerstate: {},
            linkedplayerstate: {}
        };
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        
        var changes={}
        var pstate=prevState.playerstate
        for (var player in prevState.players) {
            if (nextProps.deviceState.hasOwnProperty(player)) {
                    pstate[player]=nextProps.deviceState[player]
            }
        }
        if (!prevState.hasOwnProperty('deviceState')) {
            changes.deviceState=nextProps.deviceState;
        }
        if (!prevState.hasOwnProperty('classes')) {
            changes.classes=nextProps.classes;
        }
        if (!prevState.hasOwnProperty('updateDevice')) {
            changes.updateDevice=nextProps.updateDevice;
        }
        if (!prevState.hasOwnProperty('sender')) {
            changes.sender=nextProps.sender;
        }
        changes.playerstate=pstate
        return changes
    
    }
    
    
    setBaseState = data => {
        var pstate={}
        for (var player in data) {
            pstate[player]={}
        }
        return {players:data, playerstate:pstate}

    }
    
    renderSwitch(name) {

        if (this.state.playerstate.hasOwnProperty(name)) {
            return <Sonos key={ name } name={ name } linkedPlayers={ this.state.playerstate } device={ this.state.players[name] } deviceState={ this.state.playerstate[name] } sender={this.props.sender} updateDevice={this.props.updateDevice}></Sonos>
        }
        //console.log('state',this.props.deviceState[device.friendlyName])
    }

    componentDidMount() {
  	    fetch('http://home.dayton.home:8090/data/players')
 		    .then(result=>result.json())
 		    .then(data=>this.setBaseState(data))
            .then(result=>this.setState(result));
            
    }
    
    render() {
        
        const { classes } = this.props;

        return (
            <div className={classes.playerList}>
                {
                    Object.keys(this.state.players).map(name => (this.renderSwitch(name)))
                }
            </div> 
        );
    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerList);
