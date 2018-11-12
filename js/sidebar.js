import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import DeviceSelect from "./deviceSelect"
import GroupBuild from "./groupBuild"
import RegionBuild from "./region/regionBuild"
import AutomationBuilder from "./automation/automationBuilder"
import TuneIcon from '@material-ui/icons/Tune';


const styles = theme => ({
        
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
            objectBrowser: false,
            groupBuilder: false,
            autoBuilder: false,
            computerDialog : false,
        };
    }
    
    handleObjectBrowser = () => {
        this.setState({ objectBrowser: true });
    };

    handleCloseObjectBrowser = () => {
        this.setState({ objectBrowser: false });
    };

    handleOpenGroupBuilder = () => {
        this.setState({ groupBuilder: true });
    };

    handleCloseGroupBuilder = () => {
        this.setState({ groupBuilder: false });
        this.props.close()
    };

    handleOpenAutomationBuilder = () => {
        this.setState({ autoBuilder: true });
    };

    handleCloseAutomationBuilder = () => {
        this.setState({ autoBuilder: false });
        this.props.close()
    };
    
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
                    <ListItem onClick={() => this.handleOpenAutomationBuilder()}>
                        <ListItemIcon>
                            <TuneIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Automation builder'} />
                    </ListItem>
                    <ListItem onClick={ () => this.handleOpenGroupBuilder()  }>
                        <ListItemIcon>
                            <TuneIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Group Builder'} />
                    </ListItem>
                </List>
                <AutomationBuilder sendAlexaCommand={this.props.sendAlexaCommand} open={this.state.autoBuilder} close={this.handleCloseAutomationBuilder} devicesByCategory={this.props.devicesByCategory} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} sendMessage={this.props.sendMessage} />
                <RegionBuild open={this.state.groupBuilder} close={this.handleCloseGroupBuilder} devices={this.props.devices} propertiesFromDevices={this.props.propertiesFromDevices} />
            </Drawer>
        );
    }
}

    
Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    
};

export default withStyles(styles)(Sidebar);
