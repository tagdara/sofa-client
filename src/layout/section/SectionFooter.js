import React  from 'react';
import { useMediaQuery } from '@mantine/hooks'
import { Group, Paper, Title } from '@mantine/core';
import { usePageFrame } from 'helpers/usePageFrame'
import useLayoutStore from 'layout/layoutStore'

const SectionFooter = props => {

    const { stacksWidth} = usePageFrame()
    const wide = useMediaQuery('(min-width: 640px)');
    const isMobile = useLayoutStore( state => state.isMobile)

    if (isMobile) {
        return (    
                <Group  noWrap 
                        style={{ 
                            flexShrink: 0, 
                            overflow: "hidden", 
                            margin: "0 auto", 
                            width: "100%", 
                            maxWidth: stacksWidth 
                        }} 
                        position="apart"
                >
                    { props.title && <Title order={3} >{props.title}</Title> }
                    {props.children}
                </Group>
        )   
    }


    return (    
        <Paper style={{ 
                        position: "absolute", 
                        bottom: wide ? 64 : 8, 
                        maxWidth: 480, 
                        width: "100%", 
                        padding: 8,
                        left: 0,
                        right: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                        zIndex: 900,
                    }}
            >
            <Group  noWrap 
                    style={{ 
                        flexShrink: 0, 
                        overflow: "hidden", 
                        margin: "0 auto", 
                        width: "100%", 
                        maxWidth: stacksWidth 
                    }} 
                    position="apart"
            >
                { props.title && <Title order={3} >{props.title}</Title> }
                {props.children}
            </Group>
        </Paper>
    )
}

export default SectionFooter;
