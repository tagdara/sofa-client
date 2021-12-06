import React from 'react';
import { Button, Group } from '@mantine/core';
import MainContent from 'beta/layout/MainContent'

const WideFrame = props => {

    return (
        <Group position="apart" 
                sx={{ 
                    width: "100%",
                    minHeight: 0, 
                    alignItems: "flex-start", 
                    flexWrap: "nowrap", 
                    overflow: "hidden",
                    maxHeight: "100%"
                }} 
        >
            <Group noWrap direction="column" sx={{ width: "100%", minWidth: 300, margin: "0 auto", maxHeight: "100%"}}>
                <MainContent />
                <Button fullWidth variant="light" size="sm" >Return</Button> 
            </Group>
        </Group>
    )
}

export default WideFrame
