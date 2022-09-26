import React, { useState } from 'react';
import ActivityNavButton from 'activity/ActivityNavButton';
import useUserStore from 'user/userStore';
import { selectPage } from 'helpers/layoutHelpers';
import { NavLink } from '@mantine/core';
import { IconStar } from '@tabler/icons';

const Favorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )
    const [openActive, setOpenActive] = useState(true)

    function selectAutomation(automation) {
        selectPage('ActivitiesPage', {'name':automation, 'noBottom':true } )
    }    

    if (!favorites) { return null }

    return (
        <NavLink 
            label={"Favorites"}
            description={"Activities and selected devices"}
            icon={<IconStar size={20} />}
            defaultOpened={true}
            childrenOffset={16}
            active={openActive}
            onChange={setOpenActive}
        >
            { favorites.map(endpointId => 
                <ActivityNavButton small={true} endpointId={endpointId} key={endpointId}
                    favorite={true} allowEdit={false} 
                    launcher={true} icon={"base"}
                    select={selectAutomation}
                    description={"Activity"}
                />
            )}
        </NavLink>
    )
}

export default Favorites;