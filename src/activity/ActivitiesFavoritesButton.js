import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { NavLink } from '@mantine/core';
import { IconStar } from '@tabler/icons';

const FavoritesButton = () => {
    
    return (
        <NavLink onClick={() => selectPage('ActivitiesPage', {'favorites':true})}
                icon={<IconStar size={20} />}
                label={"Favorites"}
        />
    )
}

export default FavoritesButton

