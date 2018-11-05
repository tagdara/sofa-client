import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
        
    listItem: {
        padding: "16 0",
        width: '100%',
    },

});

class EventItem extends React.Component {

    render() {
        
        const { classes, event, name, edit } = this.props;
        
        return (
            <ListItem className={classes.listItem} >
                { edit ?
                    <Avatar onClick={ () => this.props.delete(name)}><CloseIcon /></Avatar>
                :
                    <Avatar className={classes.waterIcon}  onClick={ () => this.props.open(name) }><ScheduleIcon /></Avatar>
                }
                <ListItemText primary={name} secondary={event.triggers[0].deviceName+" "+event.triggers[0].value}/>
                <Switch color="primary" disabled={edit} checked={event.enabled} onChange={ (e) => this.props.toggleSchedule(e) } />
            </ListItem>
        )
    }
}

EventItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventItem);
