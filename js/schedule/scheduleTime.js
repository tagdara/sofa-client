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
        backgroundColor: theme.palette.primary.dark,
    },
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
    },

});


class ScheduleTime extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            intervalUnits: ['days','hours','minutes'],
        };
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon } onClick={ () => this.props.clear(this.props.target) }><ScheduleIcon /></Avatar>
                <ListItemText className={ classes.shortLabel} primary="At" />
                <TextField
                    className={classes.input}
                    type="time"
                    margin={"normal"}
                    value={this.props.value}
                    onChange={(e) => this.props.change(this.props.target, e.target.value)}
                />
            </ListItem>
        )
    }

}

ScheduleTime.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleTime);
