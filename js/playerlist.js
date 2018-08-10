
import React from "react";
import SonosGrid from './devices/sonosGrid';
import SonosPlayerCard from './devices/sonosPlayerCard';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class PlayerList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activePlayer: 'Office',
            showGrid: false,
        }
        
        this.chooseActivePlayer = this.chooseActivePlayer.bind(this);
        this.handleGrid = this.handleGrid.bind(this);

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
        
        const { classes } = this.props;

        return (
            <div className={classes.list}>
                {   !this.state.showGrid ?
                        (this.props.devices.map((device) =>
                           (device.friendlyName==this.state.activePlayer ?
                                <SonosPlayerCard chooseActivePlayer={this.chooseActivePlayer} key={device.endpointId} handleGrid={this.handleGrid} key={ device.endpointId } name={ device.friendlyName } linkedPlayers={ this.props.deviceProperties }  device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={ this.props.sendMessage } />
                            :
                            null )
                        ))
                    : 
                        <SonosGrid closeGrid={this.handleCloseGrid} showGrid={this.state.showGrid} chooseActivePlayer={this.chooseActivePlayer} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage}/>
                }
            </div> 
        );

    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerList);
