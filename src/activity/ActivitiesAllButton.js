import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { NavLink } from '@mantine/core';
import { IconList } from '@tabler/icons';

const ActivitiesAllButton = () => {
    
    return (
        <NavLink onClick={() => selectPage('ActivitiesPage', {'favorites':false})}
                icon={<IconList size={20} />}
                label={"All Activities"}
        />
    )
}

export default ActivitiesAllButton

