import React from 'react';
import CardBase from 'components/CardBase';

export const nested = (WrappedComponent) => {

    // Nested means a component is part of a different list construct
    // and should not have CardBase wrapped around it

    const NestedComponent = props => {
        if (!WrappedComponent) {
            return null
        }
        if (props.nested) {
            return <WrappedComponent {...props} />
        }

        return (
            <CardBase {...props} >
                <WrappedComponent {...props} />
            </CardBase>
        )
        }
     
    return NestedComponent;
};
    
        
