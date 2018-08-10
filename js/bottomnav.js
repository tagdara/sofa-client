
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import LightbulbOutlineIcon from '@material-ui/icons/LightbulbOutline'
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SettingsIcon from '@material-ui/icons/Settings';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const styles = {
  root: {
    minWidth: 320,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    paddingBottom: "env(safe-area-inset-bottom)",
  },
};

class BottomNav extends React.Component {
  state = {
    value: 'recents',
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
        <BottomNavigationAction label="Lights" value="Lights" icon={<LightbulbOutlineIcon />} />
        <BottomNavigationAction label="AV" value="Audio Video" icon={<SubscriptionsIcon />} />
        <BottomNavigationAction label="Security" value="Security" icon={<VerifiedUserIcon />} />
        <BottomNavigationAction label="Other" value="Other" icon={<SettingsIcon />} />
      </BottomNavigation>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
