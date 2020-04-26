import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MenuIcon from '@material-ui/icons/Menu';
import LightbulbOutlineIcon from './LightbulbOutline';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SecurityIcon from '@material-ui/icons/Security';
import ThermostatIcon from '@material-ui/icons/DataUsage';

const useStyles = makeStyles({
    mobileBar: {
        boxSizing: "border-box",
        alignContent: "flex-start",
        zIndex: 1000,
        display: "flex",
    },
});

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { applyHomePage} = useContext(LayoutContext);
    
    function changeSection(section) {
        console.log('section', section)
        setValue(section);
        if (section===0) {
            applyHomePage('Audio Video')
        }
        if (section===1) {
            applyHomePage('Lights and Comfort')
        }
        if (section===2) {
            applyHomePage('Climate')
        }
        if (section===3) {
            applyHomePage('Security')
        }
        if (section===4) {
            applyHomePage('System')
        }
    }

    return (
        <BottomNavigation
          value={value}
          onChange={ (event, newValue) => { changeSection(newValue) }}
          showLabels
          className={classes.mobileBar}
        >
            <BottomNavigationAction label="AV" icon={<QueueMusicIcon />} />
            <BottomNavigationAction label="Lights" icon={<LightbulbOutlineIcon />} />
            <BottomNavigationAction label="Climate" icon={<ThermostatIcon />} />
            <BottomNavigationAction label="Security" icon={<SecurityIcon />} />
            <BottomNavigationAction label="More" icon={<MenuIcon />} />
        </BottomNavigation>
    )
}