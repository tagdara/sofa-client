import React from 'react';
import useLayoutStore from 'layout/layoutStore'
import { useMediaQuery } from '@mantine/hooks';
import { ActionIcon, Card, Group, Modal, Stack, Title, Portal,Transition  } from '@mantine/core'
import { IconX } from '@tabler/icons';

const PullUpCard = props => {

    const container = document.getElementById('bottomrender')
    const wide = useMediaQuery('(min-width: 640px)');
    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)


    const closeOverlay = () => {
        setStackPullUp(undefined)
        setStackCardHighlight(undefined)
    }

    const PullUpContents = props => {
        return (
            <Stack spacing="lg">
                <Group position="apart">
                    <Title order={3}>{props.title}</Title>
                    <ActionIcon onClick={closeOverlay}>
                        <IconX size={20} />
                    </ActionIcon>
                </Group>
                { props.children }
            </Stack>       
        )
    }

    if (wide) {
        return (
            <Modal withCloseButton={false} onClose={closeOverlay} centered opened={stackPullUp !== undefined} >
                <PullUpContents {...props} />
            </Modal>
        )
    }

    return (
        <Transition mounted={ stackPullUp === props.name }  transition={"slide-up"} duration={2000} timingFunction="ease">
        {(styles) => 
            <Portal target={container} style={{ ...styles, width: 10 }}>
                <Card radius="lg" p="xl" style={{ width: "100%", maxWidth: 480 }}>
                    <PullUpContents {...props} />
                </Card>    
            </Portal>
        }
        </Transition>
    );
}

export default PullUpCard
