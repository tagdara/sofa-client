import React from 'react';
import CardBase from 'components/CardBase';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { selectPage } from 'store/layoutHelpers'

import CardLine from 'components/CardLine';
import CardLineText from 'components/CardLineText';
import CardLineIcon from 'components/CardLineIcon';

export default function AutomationAll(props) {
    
    return (
        <CardBase noPad={true} onClick={() => selectPage('AutomationsLayout', {'favorites':false})}>
            <CardLine>
                <CardLineIcon on={false}><ListAltIcon /></CardLineIcon>
                <CardLineText primary={"All Automations"}/>
            </CardLine>                
        </CardBase>
    )
}

