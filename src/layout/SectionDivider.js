import React from 'react';
import { Divider } from '@mantine/core';
import usePageFrame from 'helpers/usePageFrame'

export const SectionDivider = props => {

    const { stacksWidth } = usePageFrame()

    return <Divider label={props.label}
                    style={{ 
                        paddingTop: props.first ? undefined : 24,
                        paddingBottom: 8,
                        margin: "0 auto", 
                        width: "100%", 
                        maxWidth: stacksWidth
                    }}
            />
}

export default SectionDivider
