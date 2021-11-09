import React from 'react';
import SofaListItem from 'components/SofaListItem';
import CardBase from 'components/CardBase';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { selectPage } from 'store/layoutHelpers'

export default function AutomationAll(props) {
    
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

