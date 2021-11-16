import React from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import CloudOffIcon from '@mui/icons-material/CloudOff';

import ItemBase from "components/ItemBase"
import CardLine from 'components/CardLine'
import CardLineText from 'components/CardLineText'
import CardLineIcon from 'components/CardLineIcon'

import { isFavorite, removeFavorite } from 'store/deviceHelpers'

const ActivityItemMissing = props => {

    // If this isn't a favorite, it's probably not missing it's just not loaded yet
    if (!isFavorite(props.endpointId)) { return null }

    return (
        <ItemBase small={ props.small } highlight={props.highlight}>
            <CardLine>
                <CardLineIcon><CloudOffIcon /></CardLineIcon>
                <CardLineText primary={"Missing: "+props.endpointId} />
                <IconButton onClick={ () => removeFavorite(props.endpointId) } size={"small"}>
                    <ClearIcon />
                </IconButton>
            </CardLine>
        </ItemBase>
    );

}

export default ActivityItemMissing;

