import React, { Component, createElement  } from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';

import MenuIcon from '@material-ui/icons/Menu';
import HistoryIcon from '@material-ui/icons/History';
import EditIcon from '@material-ui/icons/Edit';
import TuneIcon from '@material-ui/icons/Tune';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

import Sidebar from './sidebar';
import BottomNav from './bottomnav';
import PageSecurity from "./pageSecurity";
import SofaAppBar from "./sofaAppBar";

import PlayerList from './playerlist';
import ReceiverList from './receiverlist';
import TvList from './tvlist';

import RegionCard from './regionCard'
import AreaList from './arealist';
import ButtonGrid from './devices/buttonGrid';
import AutomationDialog from "./automation/automationDialog"
import ButtonDialog from './buttonDialog';
import MiniLauncher from './miniLauncher';
import ScheduleDialog from './schedule/scheduleDialog';

const styles = {
    
    controlArea: {
        margin: "0 auto",
        maxWidth: 1440,
        paddingTop: "env(safe-area-inset-top)",
        height: "100%",
        boxSizing: "border-box",
    },
};


class DeviceApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            page: 'Audio Video',
            drawerOpen: false,
        };

        this.pageChange = this.pageChange.bind(this);
    }    
    
    pageChange = page => {
        this.setState({page:page.value})
    }
    
    handleDrawerOpen = () => {
        this.setState({ drawerOpen: true });
    };

    handleDrawerClose = () => {
        this.setState({ drawerOpen: false });
    };

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };


    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }


    render() {

        const { classes } = this.props;
        const { width } = this.state;
        const isMobile = width <= 800;

        return (
            <React.Fragment>
                <SofaAppBar open={this.handleDrawerOpen} mobile={isMobile}/>
                <Sidebar open={this.state.drawerOpen} close={this.handleDrawerClose} />
                { isMobile ? null : <Toolbar /> }

                <Grid container spacing={0} className={classes.controlArea}>
                    {this.state.page == 'Audio Video' || !isMobile ?
                        <Grid item xs={isMobile ? 12 : 4 } className={classes.gridColumn}>
                            <PlayerList Category='SPEAKER' defaultPlayer={'Office'} />
                            <ReceiverList Category='RECEIVER' />
                            <TvList Category='TV' />
                        </Grid>
                    : null }
                    {this.state.page == 'Lights' || !isMobile ?
                        <Grid item xs={isMobile ? 12 : 4 } className={classes.gridColumn}>
                            <RegionCard region="main" />
                            <ButtonGrid>
                                <MiniLauncher icon={<TuneIcon />} name={'Automations'}>
                                    <AutomationDialog />
                                </MiniLauncher>
                                <MiniLauncher icon={<DevicesOtherIcon />} name={'Other Devices'}>
                                    <ButtonDialog />
                                </MiniLauncher>
                            </ButtonGrid>
                            <ButtonGrid>
                                <MiniLauncher icon={<TuneIcon />} name={'Schedule'}>
                                    <ScheduleDialog />
                                </MiniLauncher>
                            </ButtonGrid>
                        </Grid>
                    : null }
                    {this.state.page == 'Security' || !isMobile ?
                        <Grid item xs={isMobile ? 12 : 4 } className={classes.gridColumn}>
                            <PageSecurity />
                        </Grid>
                    : null }
                </Grid>
                
                { isMobile ?
                <React.Fragment>
                    <Toolbar />
                    <BottomNav className={classes.phoneBottom} pageChange={this.pageChange} />
                </React.Fragment>
                : null }
            </React.Fragment>
        );
    }
}

DeviceApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeviceApp);
