import React, { useState } from 'react';
import ActivityItem from 'activity/ActivityItem';
import useUserStore from 'user/userStore';
import { Collapse, Stack } from '@mantine/core';
import FavoriteToggle from 'user/favorites/FavoriteToggle'

const Favorites = props => {

    const favorites = useUserStore(state => state.preferences.favorites )
    const [openActive, setOpenActive] = useState(true)

    if (!favorites) { return null }

    const toggleActive = () => {
        setOpenActive(!openActive)
    }

    return (
        <Stack>
            <FavoriteToggle open={openActive} onClick={toggleActive} />
            <Collapse in={openActive} >
                <Stack>
                    { favorites.map(endpointId => 
                        <ActivityItem 
                            endpointId={endpointId} 
                            key={endpointId} 
                            launcher={true}
                            icon={"base"}
                            disableEdit={true}
                            hideFavorite
                        />
                    )}
                </Stack>
            </Collapse>
        </Stack>
    )
}

export default Favorites;