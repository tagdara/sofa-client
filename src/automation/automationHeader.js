import React from 'react';
import AutomationTitle from "./automationTitle"
import AutomationDetails from "./automationDetails"
import GridSection from '../GridSection';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ToggleButton from '../ToggleButton'

export default function AutomationHeader(props) {

    return (    
        <GridSection name={"Automation"} >
            <AutomationTitle name={props.name} save={props.save} >
                <ToggleButton buttonState={props.favorite} onClick={ () => props.saveFavorite(!props.favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </AutomationTitle>
            <AutomationDetails automation={props.automation} name={props.name} />
        </GridSection>
    )

};
