import React, { useContext } from 'react';
import { LayoutContext } from '../layout/NewLayoutProvider';

import SofaListItem from '../SofaListItem';
import CardBase from '../CardBase';
import ListAltIcon from '@material-ui/icons/ListAlt';

export default function AutomationAll(props) {
    
    const { selectPage } = useContext(LayoutContext);
    
    return (
        <CardBase noPad={true} >
            <SofaListItem   button={true} avatarState={"off"} onClick={() => selectPage('AutomationsLayout', {'favorites':false})}
                            avatar={ <ListAltIcon /> }
                            avatarBackground={false}
                            primary={"All Automations"} 
            />
        </CardBase>
    )
}

