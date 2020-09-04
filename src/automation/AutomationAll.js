import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';

import SofaListItem from '../SofaListItem';
import GridItem from '../GridItem';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function AutomationAll(props) {
    
    const { applyLayoutCard } = useContext(LayoutContext);
    
    return (
        <GridItem wide={props.wide} nopad={true} >
        <SofaListItem   button={true} avatarState={"off"} 
                        onClick={() => applyLayoutCard('AutomationsLayout', {'favorites':false})}
                        avatar={ <ListAltIcon /> }
                        avatarBackground={false}
                        primary={"All Automations"} 
        />
        </GridItem>
    )
}

