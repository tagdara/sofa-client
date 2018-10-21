import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import SonosGrid from './devices/sonosGrid';
import SonosPlayerCard from './devices/sonosPlayerCard';
import Slide from  '@material-ui/core/Slide';


const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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
                {this.props.devices.map((device) =>
                    (device.friendlyName==this.state.activePlayer ?
                        <SonosPlayerCard sendAlexaCommand={this.props.sendAlexaCommand} TransitionComponent={Transition} chooseActivePlayer={this.chooseActivePlayer} key={device.endpointId} handleGrid={this.handleGrid} key={ device.endpointId } name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties } sendMessage={ this.props.sendMessage } />
                        :
                        null )
                    )}
                {   this.state.showGrid ?
                    <SonosGrid sendAlexaCommand={this.props.sendAlexaCommand} closeGrid={this.handleCloseGrid} showGrid={this.state.showGrid} chooseActivePlayer={this.chooseActivePlayer} devices={this.props.devices} deviceProperties={ this.props.deviceProperties } sendMessage={this.props.sendMessage}/>
                    : null
                }
            </div> 
        );

    }
}

PlayerList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PlayerList);
