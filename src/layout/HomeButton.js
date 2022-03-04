import React from 'react';
import NavButton from 'layout/NavButton';
import { selectPage } from 'helpers/layoutHelpers';
import useLayoutStore from 'store/layoutStore'
import { Home } from 'react-feather';

const HomeButton = props => {

    const setTransitionDirection = useLayoutStore( state => state.setTransitionDirection)

    const goHome = () => {
        setTransitionDirection('fade')
        selectPage('Stacks')
    }

    return <NavButton highlight avatar={<Home style={{ margin: "8px 20px 8px 8px" }} size={20} />} label={"Back to Home"} arrow onClick={goHome} />
    //return <NavButton highlight avatar={<Home size={20} />} label={"Home"} arrow onClick={goHome} />
    //return <Button size={ isMobile ? "lg" : "md" } fullWidth onClick={goHome} leftIcon={<Home size={20} />} variant="light">Back to Home</Button>
}

export default HomeButton
