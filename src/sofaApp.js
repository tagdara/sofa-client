import React, { Component, createElement  } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import Loadable from 'react-loadable';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import Sidebar from './sidebar';
import BottomNav from './bottomnav';
import SofaAppBar from "./sofaAppBar";

import ButtonGrid from './devices/buttonGrid';
import AutomationDialog from "./automation/automationDialog"
import ButtonDialog from './buttonDialog';
import ScheduleDialog from './schedule/scheduleDialog';
import EventDialog from './event/eventDialog';

import PlaceholderCard from './PlaceholderCard';

const styles = {
    
    controlArea: {
        margin: "0 auto",
        maxWidth: 1440,
        width: "100%",
        paddingTop: "env(safe-area-inset-top)",
        boxSizing: "border-box",
        overflowY: "auto",
        height: "100%",
    },
    gridColumn: {
        overflowX: "hidden",
    }
};

function cardLoading(props) {
    
    if (props.error) {
        console.log(props)
        return <div>Error</div>;
    } else if (props.pastDelay) {
        return <PlaceholderCard />;
    } else {
        return null;
    }
}

class SofaApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            page: 'Audio Video',
            drawerOpen: false,
            automationOpen: false,
            scheduleOpen: false,
            modules: [],
            moduleLayout: { "Audio Video": [    {"module": "PlayerList", "file": "./PlayerList", "props": { "Category" : "SPEAKER" } },
                                                {"module": "ReceiverList", "file": "./ReceiverList", "props": { "Category" : "RECEIVER" } },
                                                {"module": "TvList", "file": "./TvList", "props": { "Category" : "TV"} }
                                            ],
                            "Lights":       [   {"module": "RegionCard", "file": "region/RegionCard", "props": { "region" : "main" } },
                                                {"module": "ThermostatHero", "file": "thermostat/ThermostatHero", "props": { "Category" : "THERMOSTAT" } },
                                                {"module": "MiniLauncher", "file": "./MiniLauncher", "props": { "icon": <DevicesOtherIcon />, "name":"More Devices", "dialog": <ButtonDialog/> } },
                                            ],
                            "Security":     [   {"module": "ZoneList", "file": "./ZoneList", "props": { "Category":"ZONE" } },
                                                {"module": "CameraSelect", "file": "./CameraSelect", "props": {} },
                                                {"module": "MiniCard", "file": "./MiniCard", "props": { "name":"Front Gate" } },
                                                {"module": "MiniCard", "file": "./MiniCard", "props": { "name":"Garage Door" } }
                                            ]
            },
        };
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.pageChange = this.pageChange.bind(this);
    } 
    
      
    pageChange = page => {
        this.setState({page:page.value})
    }

    handleDialogOpen = (dialog) => {
        if (dialog=='Automation') {
            this.setState({ automationOpen: true})
        } else if (dialog=='Schedule') {
            this.setState({ scheduleOpen: true})
        }
    }

    handleDialogClose = () => {
        this.setState({ automationOpen: false, scheduleOpen: false})
    }

    
    handleDrawerOpen = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen });
    };

    handleDrawerClose = () => {
        this.setState({ drawerOpen: false });
    };

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    addModules = () => {
        
        const { active } = this.state, modules = {};
        // Create loadables. THIS IS THE MAGIC!
        Object.keys(this.state.moduleLayout).map(page =>
            this.state.moduleLayout[page].map( item => {
                if (modules.hasOwnProperty(item['module'])) {
                    return modules[item['module']]
                } else {

                return modules[item['module']]=(Loadable({
                    //loader: () => import(item['file']), // Here can be any component!
                    loader: () => import('./'+item['module']), // Here can be any component!
                    loading: cardLoading,
                }));
                }
            }));
        this.setState({ ...this.state, modules, active });
    }

    componentDidMount() {
        this.addModules()
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    renderMod = ( item, page, index ) => {

        if (Object.keys(this.state.modules).includes(item['module'])) {
            let Module = this.state.modules[item['module']]
            return <Module key={ page+index } {...item['props']} />
        } else {
            return null
        }

    }
    
    render() {

        const { classes } = this.props;
        const { width, modules, categories, active, moduleLayout, automationOpen, scheduleOpen } = this.state;
        const isMobile = width <= 800;

        return (
            <React.Fragment>
                <SofaAppBar open={this.handleDrawerOpen} mobile={isMobile}/>
                <Sidebar open={this.state.drawerOpen} close={this.handleDrawerClose} handleDialog={this.handleDialogOpen} />
                { isMobile ? null : <Toolbar /> }

                <Grid container spacing={0} className={classes.controlArea}>
                    { Object.keys(moduleLayout).map(page => {
                        return (this.state.page==page || !isMobile) ?

                        <Grid key={page} item xs={ isMobile ? 12 : 4 } className={classes.gridColumn}>
                            { moduleLayout[page].map( (item, i) => 
                                this.renderMod(item, page, i)
                            )}
                        </Grid>
                        : null 
                    })}
                </Grid>
                { automationOpen ?
                    <AutomationDialog open={automationOpen} close={this.handleDialogClose} />
                : null }
                { scheduleOpen ?
                    <ScheduleDialog open={scheduleOpen} close={this.handleDialogClose} />
                : null }

                { isMobile ?
                <React.Fragment>
                    <Toolbar />
                    <BottomNav pageChange={this.pageChange} toggleSidebar={this.handleDrawerOpen} closeSidebar={this.handleDrawerClose}/>
                </React.Fragment>
                : null }
            </React.Fragment>
        );
    }
}

SofaApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(SofaApp));
