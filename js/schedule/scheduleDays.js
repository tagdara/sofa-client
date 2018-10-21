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
    chip: {
        margin: "0 4",
    },
    hotChip: {
        backgroundColor: "#6666FF",
        margin: "0 4",
    },
    

});


class ScheduleDays extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
        };
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><ScheduleIcon /></Avatar>
                { this.state.daysOfTheWeek.map((day) => 
                    <Chip className={this.props.days.includes(day) ? classes.hotChip : classes.chip } key={day}  label={day} onClick={(e) => this.props.editDays(day)}/>
                )}
            </ListItem>
        )
    }

}

ScheduleDays.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleDays);
