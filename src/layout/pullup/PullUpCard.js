import React, { useEffect, useState } from 'react';
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
    const [ mounted, setMounted ] = useState(false)

    useEffect(() => {
        setMounted(true)
    // eslint-disable-next-line 
    }, []);


    const closeOverlay = () => {
        setStackPullUp(undefined)
        setStackCardHighlight(undefined)
    }

    const PullUpContents = props => {
        return (
            <Stack spacing="lg">
                <Group position="apart">
                    <Title order={3}>{props.title}</Title>
                    <ActionIcon onClick={() => { wide ? closeOverlay() : setMounted(false)} }>
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
    // stackPullUp === props.name }
    return (
        <Portal target={container} >
            <Transition mounted={ mounted }  transition={"slide-up"} exitDuration={100} duration={200} timingFunction="ease" onExited={closeOverlay}>
                {(styles) => 
                        <Card radius="lg" p="xl" style={{  ...styles, width: "100%", maxWidth: 480 }}>
                            <PullUpContents {...props} />
                        </Card>    
                }
            </Transition>
        </Portal>
    );
}

export default PullUpCard
