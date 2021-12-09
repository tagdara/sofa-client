import React from 'react';
import { Button, Group } from '@mantine/core';

export default function MobileFrame() {

    return (
            <Group direction="column" noWrap grow sx={{ 
                    maxWidth: "100%", 
                    height: "100%",
                    paddingTop: "env(safe-area-inset-top)",
                    }}>
                <Group>
                    <Button fullWidth variant="light" size="sm" >Return</Button> 
                </Group>
            </Group>
    )
}


