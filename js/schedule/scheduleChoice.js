import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },


});


class ScheduleChoice extends React.Component {

    render() {
        
        const { classes } = this.props;
        
        return (
                <ListItem className={classes.listItem} onClick={() => this.props.choose(this.props.target,this.props.value) }>
                    <Avatar>{this.props.icon}</Avatar>
                    <ListItemText primary={this.props.choice} secondary={this.props.desc} />
                </ListItem>
        )
    }

}

ScheduleChoice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScheduleChoice);
