import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Sidebar from './sidebar';
import BottomNav from './bottomnav';
import SofaAppBar from "./sofaAppBar";
import SofaAppContent from "./SofaAppContent";
import ErrorBoundary from './ErrorBoundary'

class SofaApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            width: window.innerWidth,
            drawerOpen: false,
        };
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
    
    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    
    render() {

        const { width, drawerOpen } = this.state;
        const isMobile = width <= 800;
        
        return (
            <React.Fragment>
                <SofaAppBar open={this.handleDrawerOpen} mobile={isMobile}/>
                <Sidebar open={drawerOpen} close={this.handleDrawerClose} />
                { !isMobile && <Toolbar /> }
                <ErrorBoundary>
                    <SofaAppContent />
                </ErrorBoundary>    
                { isMobile && <BottomNav toggleSidebar={this.handleDrawerOpen} closeSidebar={this.handleDrawerClose}/> }
            </React.Fragment>
        );
    }
}

export default SofaApp;