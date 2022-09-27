import useLayoutStore from 'layout/layoutStore'

const usePullUp = (cardName, pullUpName) => {

    const setStackCardHighlight = useLayoutStore( state => state.setStackCardHighlight)
    const setStackPullUp = useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === pullUpName

    const showPullUp = () => {
        setStackCardHighlight(cardName)
        setStackPullUp(pullUpName, {})
    }

    const clearPullUp = () => {
        setStackCardHighlight(undefined)
        setStackPullUp(undefined)      
    }

    return { pullUpActive, stackPullUp, showPullUp, clearPullUp }

}

export default usePullUp