import React from 'react';

import FavoriteIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import ActivityName from "activity/editor/layout/ActivityName"
import ActivityDetails from "activity/editor/layout/ActivityDetails"

import IconButton from '@mui/material/IconButton';
import CardBase from 'components/CardBase';
import { isFavorite, makeFavorite } from 'store/deviceHelpers'
import useActivityEditorStore from 'store/activityEditorStore'

const ActivityHeader = props => {

    const endpointId = useActivityEditorStore( state => state.endpointId )
    var favorite = isFavorite(endpointId)

    function toggleFavorite() {
        makeFavorite(endpointId, !favorite)
        favorite = isFavorite(endpointId)
    }

    return (    
        <CardBase wide={true}>
            <ActivityName>
                <IconButton size="small" color={favorite ? 'primary' : undefined } onClick={toggleFavorite}>
                    { favorite ? <FavoriteIcon /> : <StarOutlineIcon /> }
                </IconButton>
            </ActivityName>
            <ActivityDetails />
        </CardBase>
    )

};

export default ActivityHeader
