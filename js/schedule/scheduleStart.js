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
    shortLabel: {
        flexGrow:0,
    },
    input: {
        marginTop:0,
        flexGrow:0,
        marginBottom:0,
    },
});


class ScheduleStart extends React.Component {

    shortTimeFormat = (thisdate) => {
        if (thisdate) {
            var longdate=thisdate
        } else {
            var longdate=new Date().toISOString().replace('Z','')
        }

        if (longdate.split(':').length>2) {
            longdate=longdate.split(':')[0]+":"+longdate.split(':')[1]
        }

        return longdate
    }

    render() {
        
        const { classes } = this.props;
        
        return (
            <ListItem className={classes.listItem}> 
                <Avatar className={ classes.activeIcon }><EventIcon /></Avatar>
                <ListItemText className={classes.shortLabel} primary="Starting on" />
                <TextField
                    className={classes.input}
                    type="datetime-local"
                    id={'specstart'}
                    margin={"normal"}
                    value={this.props.value ? this.props.value : this.shortTimeFormat() }
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
