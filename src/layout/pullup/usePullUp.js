import useLayoutStore from 'layout/layoutStore'

const usePullUp = (pullUpName) => {

    const setStackPullUp = useLayoutStore( state => state.setStackPullUp)
    const stackPullUp = useLayoutStore( state => state.stackPullUp)
    const pullUpStatus = (pullUpName && stackPullUp) && stackPullUp === pullUpName
    const pullUpActive = pullUpStatus === true

    const showPullUp = () => {
        setStackPullUp(pullUpName)
    }

    const clearPullUp = () => {
        setStackPullUp(undefined)      
    }

    return { pullUpActive, stackPullUp, showPullUp, clearPullUp }

}

export default usePullUp