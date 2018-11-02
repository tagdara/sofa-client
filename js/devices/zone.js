import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({

    closed: {
        backgroundColor: "#6a6",
        color: "#fff",
    },
    open: {
        backgroundColor: "#e66",
    },
    listItem: {
        padding: "12 16",
        width: '100%',
    },

});

class Zone extends React.Component {
    
    render() {

        const { classes } = this.props;
        return (
            <ListItem className={classes.listItem}>
                { this.props.deviceProperties.position=='closed' ?
                <Avatar className={classes.closed} onClick={ () => this.toggleFilter('all') }><DoneIcon  /></Avatar>
                :
                <Avatar className={classes.open} onClick={ () => this.toggleFilter('all') }><ClearIcon /></Avatar>
                }
                <ListItemText primary={this.props.name}/>
            </ListItem>
        );
    }
}

Zone.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Zone);

