
import React from "react";
import Tv from './devices/tv';
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

class TvList extends React.Component {

    render() {
        
        const { classes } = this.props;

        return (
            <div className={classes.list}>
                { this.props.devices.map((device) => (
                    <Tv key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendMessage={ this.props.sendMessage } />
                    ))
                }
            </div> 
        );

    }
}

TvList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TvList);
