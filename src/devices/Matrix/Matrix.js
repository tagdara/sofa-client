import React from 'react';

import GridItem from 'components/GridItem';
import MatrixListItem from 'devices/Matrix/MatrixListItem';

const Matrix = props => {

    // General nesting needs to be refactored to prevent having shims like this one

    if (!props.nested) {
        return (               
            <GridItem >
                <MatrixListItem {...props} />
            </GridItem> 
        )
    }

    return (
        <MatrixListItem {...props} />
    )
}

export default Matrix;

