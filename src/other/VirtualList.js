import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import Shade from './Shade';

export default function VirtualList(props) {

    const { virtualDeviceStates, directive } = useContext(DataContext);

    return (
        virtualDeviceStates ?
            <React.Fragment>
                { Object.keys(virtualDeviceStates).map((key, index) => (
                    virtualDeviceStates[key]['type']==='shade' ?
                        <Shade nested={props.nested} directive={directive} key={ index } name={ key } endpointId={ virtualDeviceStates[key].endpointId } commands={ virtualDeviceStates[key].commands } />
                        :null
                ))}
            </React.Fragment>
        : null 
    );
}
