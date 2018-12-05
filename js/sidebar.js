import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withThemeChange } from './DataContext/withThemeChange';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TuneIcon from '@material-ui/icons/Tune';
import HistoryIcon from '@material-ui/icons/History';
import CompareIcon from '@material-ui/icons/Compare';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';


const styles = theme => ({
        
    listItem: { minHeight: 48,
    },
    list: {
        minWidth: 320,
    },
    drawerHeader: {
        paddingTop: "env(safe-area-inset-top)",
    },

   
});    


class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
        };
    }
    
    handleDialog = ( dialog ) => {
        this.props.handleDialog(dialog)
        this.props.close()
    }
    
    otherPort = (portnumber, tabname) => {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    render() {
    
        const { classes } = this.props;
        
        return (

            <Drawer
                variant="persistent"
                open={this.props.open}
                classes={{ paper: classes.drawerPaper,}}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={this.props.close}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem onClick={() => this.handleDialog('Automation')}>
                        <ListItemIcon>
                            <TuneIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Automation'} />
                    </ListItem>
                    <ListItem onClick={() => this.handleDialog('Schedule')}>
                        <ListItemIcon>
                            <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Scheduler'} />
                    </ListItem>
                    <ListItem className={classes.listItem} />
                    <Divider />
                    <ListItem onClick={()=> this.otherPort('8443','_editor')}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Editor'} />
                    </ListItem>
                    <ListItem className={classes.listItem} />
                    <Divider />
                    <ListItem onClick={() => this.props.setColorScheme(this.props.colorScheme=='dark' ? 'light' : 'dark')}>
                        <ListItemIcon>
                            <CompareIcon />
                        </ListItemIcon>
                        <ListItemText primary={this.props.colorScheme=='dark' ? 'Light Mode' : 'Dark Mode'} />
                    </ListItem>
                    <ListItem >
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary={'User Options'} />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

    
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    
};

export default withThemeChange(withStyles(styles)(Sidebar));

