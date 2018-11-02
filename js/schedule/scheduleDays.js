import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import Button from '@material-ui/core/Button';

const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        marginRight: 8,
        backgroundColor: theme.palette.primary.dark,
    },
    button: {
        minWidth: 36
    },
    hotButton: {
        minWidth: 36,
        "&:hover" : {
            backgroundColor: theme.palette.primary.light,
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    

});


class ScheduleDays extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            daysOfTheWeek: ['sun','mon','tue','wed','thu','fri','sat'],
        };
    }
    
    editDays = (day) => {
        var sdays=this.props.value
        if (sdays.includes(day)) {
            sdays.splice(sdays.indexOf(day),1)
        } else {
            sdays.push(day)
        }
        this.props.change(this.props.target, sdays)
    }
    
    render() {
        
        const { classes } = this.props;
        
        return (
            <React.Fragment>
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><ViewWeekIcon /></Avatar>
                { this.state.daysOfTheWeek.map((day) => 
                    <Button size="small" className={this.props.value.includes(day) ? classes.hotButton : classes.button } key={day} onClick={(e) => this.editDays(day)} >
                        {day}
                    </Button>
                    )
                }
            </ListItem>
            </React.Fragment>
        )
    }

}

ScheduleDays.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleDays);
