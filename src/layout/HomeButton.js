import React from 'react';
import NavButton from 'layout/NavButton';
import { selectPage } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'

const HomeButton = props => {

    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)

    const goHome = () => {
        setTransitionDirection('fade')
        selectPage('Stacks')
    }

    return <NavButton highlight label={"Home"} arrow onClick={goHome} />

}

export default HomeButton
