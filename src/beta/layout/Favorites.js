import React from 'react';
import CardLine from 'beta/components/CardLine';
import ActivityNavButton from 'beta/activity/ActivityItem';
import useUserStore from 'store/userStore'
import { selectPage } from 'store/layoutHelpers';
import { Group } from '@mantine/core';

const Favorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )

    function selectAutomation(automation) {
        selectPage('ActivitiesPage', {'name':automation, 'noBottom':true } )
    }    

    if (!favorites) { return null }

    return (    
            <Group direction="column" spacing={"xs"}>
                <CardLine primary={"Favorites"} />
                { favorites.map(endpointId => 
                    <ActivityNavButton small={true} endpointId={endpointId} key={endpointId}
                                    favorite={true} allowEdit={false} 
                                    launcher={true} icon={"base"}
                                    select={selectAutomation}
                    />
                )}
            </Group>
    )
}

export default Favorites;