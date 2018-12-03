import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SonosGrid from './sonos/sonosGrid';
import SonosPlayerCard from './sonos/sonosPlayerCard';
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
            showGrid: false,
        }
        
        this.chooseActivePlayer = this.chooseActivePlayer.bind(this);
        this.handleGrid = this.handleGrid.bind(this);

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        var data=nextProps.deviceProperties
        var changes={}
        
        if (nextProps.hasOwnProperty('devices')) {
            var hotplayer='';
            for (var s = 0; s < nextProps.devices.length; s++) {
                console.log('name')
                var name=nextProps.devices[s].friendlyName
                if (data.hasOwnProperty(name)) {
                    var dev=data[name]
                    console.log(name,dev)
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
                console.log('chose',hotplayer)
                changes.activePlayer=hotplayer
            } else {
                console.log('fallback', prevState.defaultPlayer)
                changes.activePlayer=prevState.defaultPlayer
            }
            
            return changes
        }
    }

    
    handleGrid = (e) => {
        e.stopPropagation();
        this.setState({showGrid:true})
    }
    
    handleCloseGrid = (e) => {
        e.stopPropagation();
        this.setState({showGrid:false})
    }

    chooseActivePlayer = (player) => {
        this.setState({activePlayer:player, showGrid: false})
    }
    
    isPlayerActive = (player) => {
        
        if (this.props.deviceProperties[player].hasOwnProperty("playbackState")) {
            if (this.props.deviceProperties[player].playbackState=='STOPPED') {
                return false
            } else {
                return true
            }
        }
        
        return false

    }
    
    render() {
        
        const { classes, devices } = this.props;
        const { activePlayer, showGrid } = this.state;

        return (
            <div className={classes.list}>
                { devices.map((device) =>
                    (device.friendlyName==activePlayer ?
                        <SonosPlayerCard sendAlexaCommand={this.props.sendAlexaCommand} deviceByName={this.props.deviceByName} chooseActivePlayer={this.chooseActivePlayer} key={device.endpointId} handleGrid={this.handleGrid} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties } />
                    : null )
                    )}
                { showGrid ?
                    <SonosGrid sendAlexaCommand={this.props.sendAlexaCommand} closeGrid={this.handleCloseGrid} showGrid={showGrid} chooseActivePlayer={this.chooseActivePlayer} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage}/>
                : null }
            </div> 
        );
    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withData(withStyles(styles)(PlayerList));
