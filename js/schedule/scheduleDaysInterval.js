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
        display: "flex",
        padding: "16 0",
        width: '100%',
        alignItems: "center",
    },
    dataInput: {
        width: 50,
        margin:0,
    },
    followText: {
        flexGrow: 0,
    },
    activeIcon: {
        backgroundColor: theme.palette.primary.dark,
    },

});


class ScheduleDaysInterval extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
                <ListItem className={classes.listItem}>
                    <Avatar className={parseInt(this.props.value)>0 ? classes.activeIcon : classes.passiveIcon } onClick={ () => this.props.clear(this.props.target) }><ScheduleIcon /></Avatar>
                    <ListItemText primary="Every" />
                    <TextField
                        className={classes.dataInput}
                        id={'spectime'}
                        margin={"normal"}
                        type="number"
                        value={this.props.value}
                        onChange={(e) => this.props.change(this.props.target, e.target.value) }
                    />
                    <ListItemText className={classes.followText} primary="days" />
                </ListItem>

        )
    }

}

ScheduleDaysInterval.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleDaysInterval);
