import React from 'react';
//import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';
import Matrix from 'devices/Matrix/Matrix';

export default function MatrixList(props) {

    //const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))
    const matrixManualSort = [  "matrix:output:O1", "matrix:output:O3", "matrix:output:O6", "matrix:output:O7",
                                "matrix:output:O2", "matrix:output:O4", 
                                "matrix:output:O5", "matrix:output:O8"
                            ]

    const defaults = 
    {   "matrix:output:O1" : "Input.I1",
        "matrix:output:O2" : "Input.I1", 
        "matrix:output:O3" : "Input.I2", 
        "matrix:output:O4" : "Input.I2", 
        "matrix:output:O5" : "Input.I2", 
        "matrix:output:O6" : "Input.I3", 
        "matrix:output:O7" : "Input.I4", 
        "matrix:output:O8" : "Input.I8", 
    }

    return (
        <>
            { matrixManualSort.map(device =>
                <Matrix key={ device } endpointId={device} default={defaults[device]} nested={true} itemType={"listItem"} />
            )}
        </>
    )
}
