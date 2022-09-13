import useLayoutStore from 'store/layoutStore'
import { useMantineTheme } from '@mantine/core';
import { useViewportSize, useMediaQuery } from '@mantine/hooks';

export const usePageFrame = props => {

    const theme = useMantineTheme()
    const wide = useMediaQuery('(min-width: 640px)');
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const stackPad = wide ? theme.spacing['xl'] : theme.spacing['xs']
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )
    const { width } = useViewportSize()
    const stacksWidth = Math.min(maxScreenWidth, width)
    const maxStacks = Math.min(4, Math.floor( stacksWidth / (minStackWidth+stackPad)))
    const stackWidth = Math.round(stacksWidth / maxStacks)

    return { maxStacks, stacksWidth, stackWidth }

}

export default usePageFrame