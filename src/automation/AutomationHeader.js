import React from 'react';

import FavoriteIcon from '@material-ui/icons/Star';

import AutomationTitle from "automation/AutomationTitle"
import AutomationDetails from "automation/AutomationDetails"

import GridSection from 'components/GridSection';
import ToggleButton from 'components/ToggleButton'
import CardBase from 'components/CardBase';

export default function AutomationHeader(props) {

    return (    
        <GridSection>
            <CardBase wide={true}>
            <AutomationTitle name={props.name} save={props.save} >
                <ToggleButton buttonState={props.favorite ? 'on' : 'off' } onClick={ () => props.makeFavorite(props.endpointId, !props.favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </AutomationTitle>
            <AutomationDetails endpointId={props.endpointId} automation={props.automation} name={props.name} />
            </CardBase>
        </GridSection>
    )

};
