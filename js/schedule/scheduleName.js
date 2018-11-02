import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from  '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import EditIcon from '@material-ui/icons/Edit';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },
    chipPad: {
        margin: "0 4",
    }
});


class ScheduleName extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
                <ListItem className={classes.listItem}>
                    <Avatar className={this.props.value ? classes.activeIcon : classes.passiveIcon }><EditIcon /></Avatar>
                    <ListItemText>
                        <TextField
                            className={classes.nameInput}
                            id="required"
                            label="Schedule name"
                            margin="none"
                            value={this.props.value}
                            onChange={(e) => this.props.change(this.props.target, e.target.value) }
                        />
                    </ListItemText>
                    <ListItemText>
                        {this.props.scheduleName}
                    </ListItemText>
                </ListItem>
        )
    }

}

ScheduleName.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleName);
