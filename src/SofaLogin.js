import React from 'react';
import { useContext } from 'react';
import { NetworkContext } from './NetworkProvider';

import GridItem from './GridItem';
import GridSection from './GridSection';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function SofaLogin(props) {
    
    const { loggedIn, login } = useContext(NetworkContext);

    function checkLogin(e) { 
        console.log('ce',loggedIn,e)
        window.location.replace(window.location);
    }

    return (    
        <GridSection name={"Login"}>
            <GridItem wide={props.wide} >
                <ListItem onClick={() => login()}>
                    <ListItemText primary={'Login'}  />
               </ListItem>
            </GridItem>
        </GridSection>
    )
};