import React from 'react';
import CardLine from 'components/CardLine';
import ActivityNavButton from 'activity/ActivityItem';
import useUserStore from 'store/userStore';
import { selectPage } from 'helpers/layoutHelpers';
import { Stack } from '@mantine/core';

const Favorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )

    function selectAutomation(automation) {
        selectPage('ActivitiesPage', {'name':automation, 'noBottom':true } )
    }    

    if (!favorites) { return null }

    return (    
            <Stack spacing={"xs"}>
                <CardLine primary={"Favorites"} />
                { favorites.map(endpointId => 
                    <ActivityNavButton small={true} endpointId={endpointId} key={endpointId}
                                    favorite={true} allowEdit={false} 
                                    launcher={true} icon={"base"}
                                    select={selectAutomation}
                    />
                )}
            </Stack>
    )
}

export default Favorites;