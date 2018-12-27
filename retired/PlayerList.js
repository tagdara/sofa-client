import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SelectPlayer from './sonos/SelectPlayer';
import SonosPlayerCard from './SonosPlayerCard';
import NoPlayer from './sonos/NoPlayer';

import { withData } from './DataContext/withData';


const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    },
});

class PlayerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            defaultPlayer: "Office",
            activePlayer: "",
            userPlayer: "",
            selectPlayer: false,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (!prevState.userPlayer && nextProps.hasOwnProperty('devices')) {
            var hotplayer='';
            for (var s = 0; s < nextProps.devices.length; s++) {
                var name=nextProps.devices[s].friendlyName
                if (data.hasOwnProperty(name)) {
                    var dev=data[name]
                    if (dev.hasOwnProperty("playbackState")) {
                        if (dev.playbackState=='PLAYING') {
                            if (hotplayer=="" || name==prevState.defaultPlayer) {
                                if (dev.input==name || dev.input=="") {
                                    hotplayer=name
                                } else {
                                    hotplayer=dev.input
                                }
                            }
                        }
                    }
                }
            }
            
            if (hotplayer) {
                changes.activePlayer=hotplayer
            } else {
                changes.activePlayer=prevState.defaultPlayer
            }
        } else {
            if (prevState.activePlayer!=prevState.userPlayer) {
                changes.activePlayer=prevState.userPlayer
            }
        }
        
        return changes
    }

    
    handleSelectPlayer = (e) => {
        this.setState({selectPlayer:true})
    }
    
    handleCloseSelectPlayer = (e) => {
        this.setState({selectPlayer:false})
    }

    chooseActivePlayer = (player) => {
        this.setState({activePlayer:player, selectPlayer: false})
    }

    chooseUserPlayer = (player) => {
        this.setState({userPlayer:player, selectPlayer: false})
    }

    playerDeviceByName = (player) => {
        for (var s = 0; s < this.props.devices.length; s++) {
            if (this.props.devices[s].friendlyName==player) {
                return this.props.devices[s]
            }
        }
    }
    
    isPlayerStopped = (player) => {
        if (this.props.deviceProperties.hasOwnProperty(player)) {
            if (this.props.deviceProperties[player].hasOwnProperty("playbackState")) {
                if (this.props.deviceProperties[player].playbackState!='STOPPED') {
                    return false
                } 
            }
        }
        return true

    }
    
    render() {
        
        const { classes, devices, deviceProperties} = this.props;
        const { activePlayer, selectPlayer, userPlayer } = this.state;

        return (
            <React.Fragment>
                { !this.isPlayerStopped(activePlayer) || userPlayer!=="" ?
                <SonosPlayerCard setLayout={this.props.setLayout} name={activePlayer} sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} selectPlayer={this.handleSelectPlayer} device={ this.playerDeviceByName(activePlayer) } deviceProperties={ deviceProperties } />
                :
                <NoPlayer choose={this.handleSelectPlayer} />
                }
                { selectPlayer ?
                    <SelectPlayer sendAlexaCommand={this.props.sendAlexaCommand} close={this.handleCloseSelectPlayer} open={selectPlayer} chooseActivePlayer={this.chooseUserPlayer} devices={devices} deviceProperties={ deviceProperties } />
                : null }
            </React.Fragment> 
        );
    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(PlayerList));
