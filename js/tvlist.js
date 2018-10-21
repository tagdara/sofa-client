import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Tv from './devices/tv';

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
                    <Tv key={device.endpointId} name={ device.friendlyName } device={ device } deviceProperties={ this.props.deviceProperties[device.friendlyName] } sendAlexaCommand={this.props.sendAlexaCommand} />
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
