import React, { useContext } from 'react';
import { LayoutContext } from './layout/NewLayoutProvider';
import { DataContext } from './DataContext/DataProvider';

import LightbulbOutlineIcon from './LightbulbOutline';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import ToggleAvatar from './ToggleAvatar';
import GridItem from './GridItem';

export default function LightHero(props) {

    const { applyLayoutCard } = useContext(LayoutContext);
    const { lightCount } = useContext(DataContext);
    const lightsOn = lightCount('on');

    return (
            <GridItem wide={props.wide}>
                { lightCount('all') ?
                    <ListItem>
                        <ToggleAvatar avatarState={lightsOn ? "on" : "none"} onClick={ () => applyLayoutCard('LightLayout') }><LightbulbOutlineIcon/></ToggleAvatar>
                        <ListItemText primary={lightsOn ? lightsOn+" lights are on" : "All lights off" } onClick={ () => applyLayoutCard('LightLayout') } />
                    </ListItem>
                :
                    <ListItem>
                        <ToggleAvatar avatarState={"notready"} ><PriorityHighIcon/></ToggleAvatar>
                        <ListItemText primary={'Waiting for light data'}/>
                    </ListItem>
                }
            </GridItem>
    );
}
