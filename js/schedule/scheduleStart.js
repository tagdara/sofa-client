import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: "#6666FF",
    },

});


class ScheduleStart extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><ScheduleIcon /></Avatar>
                <ListItemText primary="Starting on" />
                <TextField
                    className={classes.dataInput}
                    type="datetime-local"
                    id={'specstart'}
                    margin={"normal"}
                    value={this.props.time}
                    onChange={(e) => this.props.editTime(e)}
                />
            </ListItem>
        )
    }

}

ScheduleStart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleStart);
