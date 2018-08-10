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

const styles = theme => ({
    paperLight: {
        display: "flex",
        alignItems: "center",
        padding: "8 16",
        width: "100%",
        maxWidth: "480px",
        boxSizing: "border-box",
    },        
    cardtext: {
        minWidth: 0,
        flexGrow:1,
        display: "flex",
        flexDirection: "column",
        padding: "0 16",
    },
    xclosed: {
        boxSizing: "border-box",
        margin: 8,
        backgroundColor: "#6a6",
        color: "#fff",
        height: 28,
        width: 28,
    },
    xopen: {
        boxSizing: "border-box",
        margin: 8,
        backgroundColor: "#e66",
        height: 28,
        width: 28,
    },
    icon: {
        height: 20,
        width: 20,
    }
});

    const filterShouldRender = filter => element => elseElement => {
        if (filter==undefined || filter=='open') return element;
            return elseElement;
    }


class Zone extends React.Component {
    
    render() {

        const { classes } = this.props;
        return (
            <Paper className={this.props.classes.paperLight} elevation={0}>
                { this.props.deviceProperties.position=='closed' ?
                <Avatar className={classes.xclosed} onClick={ () => this.toggleFilter('all') }><DoneIcon className={classes.icon} /></Avatar>
                :
                <Avatar className={classes.xopen} onClick={ () => this.toggleFilter('all') }><ClearIcon className={classes.icon} /></Avatar>
                }
                <div className={classes.cardtext}>
                    <Typography variant="subheading">{this.props.name}</Typography>
                </div>
                </Paper>
        );
    }
}

Zone.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Zone);

