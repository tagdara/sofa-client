import useLayoutStore from 'layout/layoutStore'
import { useMantineTheme } from '@mantine/core';
import { useViewportSize, useMediaQuery } from '@mantine/hooks';

export const usePageFrame = props => {

    const { width } = useViewportSize()
    const theme = useMantineTheme()
    const wide = useMediaQuery('(min-width: 640px)');
    const minStackWidth = useLayoutStore(state => state.minStackWidth )
    const root = document.getElementById('root');
    const rootFontSize = parseInt(window.getComputedStyle(root, null).getPropertyValue('font-size'));
    // const widthRem = width / rootFontSize;
    const stackPadRem = wide ? theme.spacing['xl'] : theme.spacing['xs']
    const stackPad = parseInt(stackPadRem) * rootFontSize
    const maxScreenWidth = useLayoutStore(state => state.maxScreenWidth )

    const stacksWidth = Math.min(maxScreenWidth, width)
    const maxStacks = Math.min(4, Math.floor( stacksWidth / (minStackWidth+stackPad)))
    const stackWidth = Math.round(stacksWidth / maxStacks)

    return { maxStacks, stacksWidth, stackWidth }

}

export default usePageFrame