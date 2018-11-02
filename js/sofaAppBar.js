import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withData } from './dataContext';

const styles = theme => ({
        
    list: {
        minWidth: 320,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    phoneTop: {
        paddingTop: "env(safe-area-inset-top)",
    },
    miniTop: {
        paddingTop: "env(safe-area-inset-top)",
        height: 2,
    }
}); 

class SofaAppBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
        };
    }
    
    otherPort = (portnumber, tabname) => {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    render() {
    
        const { classes } = this.props;
        
        return (
                <AppBar className={this.props.mobile ? classes.miniTop: classes.phoneTop}>
                    { this.props.mobile ?
                    null
                    :
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"  onClick={ ()=> this.props.open() }>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Home
                        </Typography>
                        <IconButton onClick={()=> this.otherPort('8443','_editor')}>
                            <EditIcon />
                        </IconButton>
                    </Toolbar>
                    }
                </AppBar>
        );
    }
}

    
SofaAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    
};

export default withStyles(styles)(SofaAppBar);
