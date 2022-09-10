import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import { List } from 'react-feather'
import { NavLink } from '@mantine/core';

const ActivitiesAllButton = () => {
    
    return (
        <NavLink onClick={() => selectPage('ActivitiesPage', {'favorites':false})}
                icon={<List size={20} />}
                label={"All Activities"}
        />
    )
}

export default ActivitiesAllButton

