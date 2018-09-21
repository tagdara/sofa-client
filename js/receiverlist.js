import React from "react";
import Receiver from './devices/receiver';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
        
    list: {
        paddingBottom: 4,
        minWidth: 320,
    },
});

class ReceiverList extends React.Component {

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
                { this.props.devices.map((device) => (
                    <Receiver sendAlexaCommand={this.props.sendAlexaCommand} key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={this.props.sendMessage}/>
                    ))
                }
            </div> 
        );

    }
}

ReceiverList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReceiverList);
