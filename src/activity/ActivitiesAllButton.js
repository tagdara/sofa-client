import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import NavButton from 'components/NavButton'
import { List } from 'react-feather'

const ActivitiesAllButton = props => {
    
    return (
        <NavButton onClick={() => selectPage('ActivitiesPage', {'favorites':false})}
                icon={<List size={20} />}
                label={"All Activities"}
                color={"green"}
        />
    )
}

export default ActivitiesAllButton

