import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import EventIcon from '@material-ui/icons/Event';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },

});


class ScheduleStart extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><EventIcon /></Avatar>
                <ListItemText primary="Starting on" />
                <TextField
                    className={classes.dataInput}
                    type="datetime-local"
                    id={'specstart'}
                    margin={"normal"}
                    value={this.props.value}
                    onChange={(e) => this.props.change(this.props.target, e.target.value)}
                />
            </ListItem>
        )
    }

}

ScheduleStart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleStart);
