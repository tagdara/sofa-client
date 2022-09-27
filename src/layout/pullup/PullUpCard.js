import React from 'react';
import { useMantineTheme } from '@mantine/core';
import useLayoutStore from 'layout/layoutStore'
import { ActionIcon, Card, Group, Title, Portal,Transition  } from '@mantine/core'
import { IconX } from '@tabler/icons';

const PullUpCard = props => {

    const theme = useMantineTheme()
    const bgColor = theme.fn.darken(theme.colors[theme.primaryColor][9], .8)
    const container = document.getElementById('bottomrender')

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp= useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)

    const closeOverlay = () => {
        setStackPullUp(undefined)
        setStackCardHighlight(undefined)
    }

    return (
        <Transition mounted={ stackPullUp === props.name }  transition={"slide-up"} duration={2000} timingFunction="ease">
        {(styles) => 
            <Portal target={container} style={{ ...styles, width: 10 }}>
                <Card radius="lg" p="xl" style={{ backgroundColor: bgColor, width: "100%", maxWidth: 480 }}>
                    <Card.Section p="xl">
                        <Group position="apart">
                            <Title order={3}>{props.title}</Title>
                            <ActionIcon onClick={closeOverlay}>
                                <IconX size={20} />
                            </ActionIcon>
                        </Group>
                    </Card.Section>
                    { props.children }
                </Card>
            </Portal>
        }
        </Transition>
    );
}

export default PullUpCard
