import React, { useContext } from 'react';
import { DataContext } from '../DataContext/DataProvider';

import Shade from './Shade';

export default function VirtualList(props) {

    const { virtualDevices, directive } = useContext(DataContext);

    return (
        virtualDevices ?
            <React.Fragment>
                { Object.keys(virtualDevices).map((key, index) => (
                    virtualDevices[key]['type']==='shade' ?
                        <Shade nested={props.nested} directive={directive} key={ index } name={ key } endpointId={ virtualDevices[key].endpointId } commands={ virtualDevices[key].commands } />
                        :null
                ))}
            </React.Fragment>
        : null 
    );
}
