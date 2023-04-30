import React, { useState } from 'react';
import ActivityLink from 'activity/ActivityLink';
import useUserStore from 'user/userStore';
import { NavLink } from '@mantine/core';
import NotificationText from 'user/NotificationTest'
// import { IconStar } from '@tabler/icons';

const Favorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )
    const [openActive, setOpenActive] = useState(true)

    if (!favorites) { return null }

    const toggleActive = () => {
        setOpenActive(!openActive)
    }

    return (
        <NavLink 
            onClick={ toggleActive}
            opened={openActive}
            variant="light"
            label="Favorites" 
            childrenOffset={0}
        >
                    { favorites.map(endpointId => 
                        <ActivityLink
                            endpointId={endpointId} 
                            key={endpointId} 
                            launcher={true}
                            icon={"base"}
                            disableEdit={true}
                            hideFavorite
                        />
                    )}
            <NotificationTest />
        </NavLink>
    )
}

export default Favorites;