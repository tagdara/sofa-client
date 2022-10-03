import useLayoutStore from 'layout/layoutStore'

const usePullUp = (pullUpName) => {

    const setStackPullUp = useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpActive = stackPullUp === pullUpName

    const showPullUp = () => {
        setStackPullUp(pullUpName)
    }

    const clearPullUp = () => {
        setStackPullUp(undefined)      
    }

    return { pullUpActive, stackPullUp, showPullUp, clearPullUp }

}

export default usePullUp