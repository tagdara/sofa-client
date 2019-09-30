import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from './theme/SofaTheme';
import { LayoutContext } from './layout/NewLayoutProvider';
import { NetworkContext } from './NetworkProvider';

import GridSection from './GridSection';
import GridItem from './GridItem';

import TuneIcon from '@material-ui/icons/Tune';
import CompareIcon from '@material-ui/icons/Compare';
import EditIcon from '@material-ui/icons/Edit';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


export default function SystemLayout(props) {

    const { logout } = useContext(NetworkContext);
    const { applyLayoutCard } = useContext(LayoutContext);
    const { applyTheme, colorScheme } = useContext(ThemeContext);
    const serverurl="https://"+window.location.hostname;
    
    function otherPort(portnumber, tabname) {
        var newurl=window.location.protocol+"//"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }

    function devBuild(portnumber, tabname) {
        var newurl="http://"+window.location.hostname+":"+portnumber;
        window.open(newurl,tabname);
    }
    
    function reloadPWA() {
        
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister();
            });
        }
        window.location.reload(true)
    }

    return (    
        <GridSection name={"System"} >
            <GridItem>
                <ListItem onClick={() => applyTheme(colorScheme==='dark' ? 'light' : 'dark')}>
                    <ListItemIcon>
                        <CompareIcon />
                    </ListItemIcon>
                    <ListItemText primary={colorScheme==='dark' ? 'Light Mode' : 'Dark Mode'} secondary={'Change interface color to suit your surroundings'} />
                </ListItem>
            </GridItem>
            <GridItem wide={props.wide}>
                <ListItem onClick={() => reloadPWA() }>
                    <ListItemIcon>
                        <RefreshIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Reload"} secondary={'Get the latest update to the client in your browser.'} />
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={() => applyLayoutCard('AdapterLayout')}>
                    <ListItemIcon>
                        <TuneIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Adapters'} secondary={'Check the status or restart an adapter.'}/>
                </ListItem>
            </GridItem>
            <GridItem wide={props.wide}>
                <ListItem onClick={()=> devBuild('3000','_devsofa')}>
                    <ListItemIcon>
                        <DeveloperBoardIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Development"} secondary={'Run the developer build.'} />
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={()=> otherPort('8443','_editor')}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Editor'} secondary={'Edit Sofa code and view logs.'}/>
                </ListItem>
            </GridItem>
            <GridItem>
                <ListItem onClick={()=> logout()}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} secondary={'Log out of Sofa.'}/>
                </ListItem>
            </GridItem>
        </GridSection>
    )
};