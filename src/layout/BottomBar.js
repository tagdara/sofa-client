import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MenuIcon from '@material-ui/icons/Menu';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SecurityIcon from '@material-ui/icons/Security';
import ThermostatIcon from '@material-ui/icons/DataUsage';

import LightbulbOutlineIcon from 'resources/LightbulbOutline';

import { LayoutContext } from 'layout/LayoutProvider';

const useStyles = makeStyles(theme => {
    
    return {
        mobileBar: {
            //position: "fixed",
            //bottom: 0,
            //left: 0,
            //right: 0,
            //alignContent: "flex-start",
            zIndex: 1000,
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
        }
    }
});

export default function SimpleBottomNavigation(props) {

    const classes = useStyles();
    const { currentStack, selectStack } = useContext(LayoutContext);
    
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