import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import DialpadIcon from '@material-ui/icons/Dialpad';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TuneIcon from '@material-ui/icons/Tune';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

const styles = theme => ({
        
    card: {
        display: 'flex',
        maxWidth: '480px',
        flexGrow: 1,
        boxSizing: "border-box",
        justifyContent: "space-between",
        margin: 2,
    },
    content: {
        minWidth: 0,
        padding: "0 !important",
        flexGrow:1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    listItem: {
        padding: 16,
        width: '100%',
    },
    
});


class MiniLauncher extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
        }
    }
    
    openDialog = () => {
        this.setState({ showDialog: true})
    }
    
    closeDialog = () => {
        this.setState({ showDialog: false });
    };    

    
    render() {

        const { classes } = this.props;


        return (
                <Paper className={classes.card}>
                    <ListItem className={classes.listItem} onClick={ () => this.openDialog(true)} >
                        <Avatar>{this.props.icon}</Avatar>
                        <ListItemText primary={this.props.name}/>
                    </ListItem>
                    {React.cloneElement(this.props.children, { open: this.state.showDialog, close: this.closeDialog })}
                </Paper>
        );
    }
}

MiniLauncher.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiniLauncher);

