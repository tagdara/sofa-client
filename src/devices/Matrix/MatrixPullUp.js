import React from 'react';
import { Stack } from '@mantine/core'
import PullUpCard from 'layout/pullup/PullUpCard'
import MatrixLine from 'devices/Matrix/MatrixLine';

const ComputerPullUp = props => {

    //const matrix = sortByName(endpointIdsByDisplayCategory('MATRIX'))
    const matrixManualSort = [  "matrix:output:O1", "matrix:output:O3", "matrix:output:O6", "matrix:output:O7",
                                "matrix:output:O2", "matrix:output:O4", 
                                "matrix:output:O5", "matrix:output:O8"
                            ]

    const defaults = 
    {   "matrix:output:O1" : "Source.I1",
        "matrix:output:O2" : "Source.I1", 
        "matrix:output:O3" : "Source.I2", 
        "matrix:output:O4" : "Source.I2", 
        "matrix:output:O5" : "Source.I2", 
        "matrix:output:O6" : "Source.I3", 
        "matrix:output:O7" : "Source.I4", 
        "matrix:output:O8" : "Source.I8", 
    }

    return (  
        <PullUpCard title={"Matrix"} name={"matrix"}>
            <Stack spacing={"xl"} width={"100%"}>
                { matrixManualSort.map(device =>
                    <MatrixLine key={ device } endpointId={device} default={defaults[device]} nested={true} itemType={"listItem"} />
                )}
            </Stack>
        </PullUpCard>
    )

}

export default ComputerPullUp;
