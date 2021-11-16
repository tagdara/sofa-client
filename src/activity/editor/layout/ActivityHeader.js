import React from 'react';

import FavoriteIcon from '@mui/icons-material/Star';

import ActivityName from "activity/editor/layout/ActivityName"
import ActivityDetails from "activity/editor/layout/ActivityDetails"

import GridSection from 'components/GridSection';
import ToggleButton from 'components/ToggleButton'
import CardBase from 'components/CardBase';
import { isFavorite, makeFavorite } from 'store/deviceHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

const ActivityHeader = props => {

    const endpointId = useActivityEditorStore( state => state.endpointId )
    const favorite = isFavorite(endpointId)

    return (    
        <GridSection>
            <CardBase wide={true}>
                <ActivityName>
                    <ToggleButton buttonState={favorite ? 'on' : 'off' } onClick={ () => makeFavorite(endpointId, !favorite) }>
                        <FavoriteIcon fontSize="small" />
                    </ToggleButton>
                </ActivityName>
                <ActivityDetails />
            </CardBase>
        </GridSection>
    )

};

export default ActivityHeader
