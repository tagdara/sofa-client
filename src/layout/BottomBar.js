import React from 'react';

import { makeStyles } from '@mui/styles';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import MenuIcon from '@mui/icons-material/Menu';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import SecurityIcon from '@mui/icons-material/Security';
import ThermostatIcon from '@mui/icons-material/DataUsage';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import { selectStack } from 'store/layoutHelpers'
import useLayoutStore from 'store/layoutStore'

const useStyles = makeStyles(theme => {
    
    return {
        mobileBar: {
            //position: "fixed",
            //bottom: 0,
            //left: 0,
            //right: 0,
            //alignContent: "flex-start",
            display: "flex",
            width: "100%",
            //padding: 16,
            //paddingBottom: "calc( 32px + env(safe-area-inset-bottom))",
        },
        bottomFrame: {
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: "env(safe-area-inset-bottom)",
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            zIndex: 1000,
        }
    }
});

export default function SimpleBottomNavigation(props) {

    const classes = useStyles();
    const currentStack = useLayoutStore( state => state.currentStack)
    
    const sections = [ "Audio Video", "Lights and Comfort", "Climate", "Security", "System" ]
    const sectionData= {   "Audio Video": { "label": "AV", "icon": <QueueMusicIcon />}, 
                            "Lights and Comfort": { "label": "Lights", "icon": <LightbulbOutlineIcon /> }, 
                            "Climate": { "label": "Climate", "icon": <ThermostatIcon /> }, 
                            "Security": { "label": "Security", "icon": <SecurityIcon /> }, 
                            "System": { "label": "More", "icon": <MenuIcon /> }
    }
    
    function changeSection(sectionNumber) {
        selectStack(sections[sectionNumber])
    }

    function getSectionPosition(section) {
        if (sections.includes(section)) {
            return sections.indexOf(section)
        } 
        return 0
    }

    return (
        <div className={classes.bottomFrame}>
            <BottomNavigation
                value={getSectionPosition(currentStack)}
                onChange={ (event, newValue) => { changeSection(newValue) }}
                showLabels
                className={classes.mobileBar}
            >
                { sections.map( item => 
                    <BottomNavigationAction key={item} label={sectionData[item].label} icon={sectionData[item].icon} />
                )}
            </BottomNavigation>
        </div>
    )
}