import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import useLayoutStore from 'layout/layoutStore'
import { Button } from '@mantine/core';
import { IconHome } from '@tabler/icons';
import { selectStack } from 'helpers/layoutHelpers';

const HomeButton = props => {

    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)
    const currentStack = useLayoutStore( state => state.currentStack)
    const previousStack = useLayoutStore( state => state.previousStack)

    const goHome = () => {
        if (currentStack === "System") {
            selectStack(previousStack)
        }
        setTransitionDirection('fade')
        selectPage('Stacks')
    }

    //return <NavButton highlight avatar={<Home style={{ margin: "8px 20px 8px 8px" }} size={20} />} label={"Back to Home"} arrow onClick={goHome} />
    //return <NavButton highlight avatar={<Home size={20} />} label={"Home"} arrow onClick={goHome} />
    return <Button radius="lg"  size={ "md" } onClick={goHome} leftIcon={<IconHome size={20} />} >Home</Button>
    // return (
    //     <ActionIcon color="primary" variant="filled" size={ "lg" } onClick={goHome}>
    //         <IconHome size={20} />
    //     </ActionIcon>
    // )
}

export default HomeButton
