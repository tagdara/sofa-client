import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import { MdLightbulbOutline as LightbulbOutlineIcon} from "react-icons/md";
//import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

// Z Index for dialogs is 1300, so this needs to be lower than that, but still very high to avoid glitches with switches showing through

const styles = {

    root: {
        position: 'fixed',
        bottom: 0,
        padding: 0,
        paddingBottom: "env(safe-area-inset-bottom)",
        boxSizing: "content-box",
        minWidth: 320,
        width: '100%',
        zIndex: 1200,
    },
};

class BottomNav extends React.Component {
    state = {
        value: 'Audio Video',
    };

    handleChange = (event, value) => {
        this.setState({ value });
        this.props.pageChange({ value });
    };

    render() {

        const { classes } = this.props;
        const { value } = this.state;

    return (
        <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
            <BottomNavigationAction value="Audio Video" icon={<SubscriptionsIcon />} />
            <BottomNavigationAction value="Lights" icon={<LightbulbOutlineIcon size={24} />} />
            <BottomNavigationAction value="Security" icon={<VerifiedUserIcon />} />
        </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
