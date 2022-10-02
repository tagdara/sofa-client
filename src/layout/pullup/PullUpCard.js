import React from 'react';
import useLayoutStore from 'layout/layoutStore'
import { useMediaQuery } from '@mantine/hooks';
import { ActionIcon, Group, Modal, Stack, Title  } from '@mantine/core'
import { IconX } from '@tabler/icons';

const PullUpCard = props => {

    const wide = useMediaQuery('(min-width: 640px)');
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)

    const closeOverlay = () => {
        setStackPullUp(undefined)
    }

    const PullUpContents = props => {
        return (
            <Stack spacing="xl">
                <Group position="apart" style={{paddingBottom: 16}}>
                    <Title order={3}>{props.title}</Title>
                    <ActionIcon onClick={closeOverlay}>
                        <IconX size={20} />
                    </ActionIcon>
                </Group>
                { props.children }
            </Stack>       
        )
    }

    return (
        <Modal withCloseButton={false} onClose={closeOverlay} centered={wide} transition={ wide ? "fade" : "slide-up"} duration={1000} 
            styles={{ 
                inner: {
                    top: wide ? undefined: "unset",
                }
            }}
            style={{ 
                top: undefined,
                bottom: wide ? undefined : 0 
            }} 
            opened = {stackPullUp === props.name } 
        >
            <PullUpContents {...props} />
        </Modal>
    )

}

export default PullUpCard
