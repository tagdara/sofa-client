import React from 'react';
import AutomationTitle from "./automationTitle"
import AutomationDetails from "./automationDetails"
import GridSection from '../GridSection';
import FavoriteIcon from '@material-ui/icons/Star';
import ToggleButton from '../ToggleButton'
import CardBase from '../CardBase';

export default function AutomationHeader(props) {

    return (    
        <GridSection>
            <CardBase wide={true}>
            <AutomationTitle name={props.name} save={props.save} >
                <ToggleButton buttonState={props.favorite ? 'on' : 'off' } onClick={ () => props.makeFavorite('logic:activity:'+props.name,!props.favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </AutomationTitle>
            <AutomationDetails automation={props.automation} name={props.name} />
            </CardBase>
        </GridSection>
    )

};
