import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import Shade from './Shade';

export default function VirtualList(props) {

    const { deviceStatesByCategory, directive } = useContext(DataContext);
    var shades=deviceStatesByCategory('INTERIOR_BLIND')
    
    return (
            <React.Fragment>
                { shades.map( shade => (
                    <Shade  device={shade} nested={props.nested} directive={directive} key={ shade.endpointId }  />
                ))}
            </React.Fragment>
        : null 
    );
}
