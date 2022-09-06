import React, { useState } from 'react';
import CardLine from 'components/CardLine';
import ActivityNavButton from 'activity/ActivityNavButton';
import useUserStore from 'store/userStore';
import { selectPage } from 'helpers/layoutHelpers';
import { NavLink, Stack } from '@mantine/core';
import { ListUl, Star, PlayCircle } from 'react-bootstrap-icons'

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
            icon={<Star size={20} />}
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