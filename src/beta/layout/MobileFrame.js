import React from 'react';
import { Button, Group } from '@mantine/core';
import MainContent from 'beta/layout/MainContent'

export default function MobileFrame() {


    return (
            <Group direction="column" noWrap grow sx={{ 
                    maxWidth: "100%", 
                    height: "100%",
                    paddingTop: "env(safe-area-inset-top)",
                    }}>
                <Group>
                    <MainContent />
                    <Button fullWidth variant="light" size="sm" >Return</Button> 
                </Group>
            </Group>
    )
}


