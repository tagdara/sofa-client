import React  from 'react';

import SectionHeader from 'layout/section/SectionHeader';
import SectionFrame from 'layout/section/SectionFrame'
import SectionGrid from 'layout/section/SectionGrid'
import PageFrame from 'layout/PageFrame'
import ComputerList from 'devices/Computer/ComputerList'
import MatrixList from 'devices/Matrix/MatrixList';
import PrinterLine from 'devices/Octoprint/PrinterLine'
import { Stack } from '@mantine/core'

const ComputerLayout = props => {

    return (  
        <PageFrame>
            <SectionFrame padScroll={200}>
                <Stack>
                    <SectionHeader first title={"Computers"} />
                    <SectionGrid>
                        <ComputerList />
                    </SectionGrid>
                    <SectionHeader title={"Screens"} />
                    <SectionGrid>
                        <MatrixList />
                    </SectionGrid>
                    <SectionHeader title={"Devices"} />
                    <SectionGrid>
                        <PrinterLine />
                    </SectionGrid>
                </Stack>
            </SectionFrame>
        </PageFrame>
    )
}


export default ComputerLayout;
