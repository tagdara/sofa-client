import React  from 'react';

import SectionHeader from 'layout/SectionHeader';
import SectionFrame from 'layout/SectionFrame'
import SectionGrid from 'layout/SectionGrid'
import PageFrame from 'layout/PageFrame'
import ComputerList from 'devices/Computer/ComputerList'
import MatrixList from 'devices/Matrix/MatrixList';
import { Group } from '@mantine/core'

const ComputerLayout = props => {

    return (  
        <PageFrame>
            <SectionFrame>
                <Group direction="column">
                    <SectionHeader title={"Computers"} />
                    <SectionGrid>
                        <ComputerList />
                    </SectionGrid>
                    <SectionHeader title={"Screens"} />
                    <SectionGrid>
                        <MatrixList />
                    </SectionGrid>
                </Group>
            </SectionFrame>
        </PageFrame>
    )
}


export default ComputerLayout;
