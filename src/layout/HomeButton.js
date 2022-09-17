import React from 'react';
import { selectPage } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { Button } from '@mantine/core';
import { IconHome } from '@tabler/icons';

const HomeButton = props => {

    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)

    const goHome = () => {
        setTransitionDirection('fade')
        selectPage('Stacks')
    }

    //return <NavButton highlight avatar={<Home style={{ margin: "8px 20px 8px 8px" }} size={20} />} label={"Back to Home"} arrow onClick={goHome} />
    //return <NavButton highlight avatar={<Home size={20} />} label={"Home"} arrow onClick={goHome} />
    return <Button fullWidth  size={ "md" } onClick={goHome} leftIcon={<IconHome size={20} />} >Home</Button>
}

export default HomeButton
