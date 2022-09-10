import React, { useEffect, useState} from 'react';
import { Card, Transition } from '@mantine/core'
import useLayoutStore from 'store/layoutStore'

const StackCard = props => {
 
    const [mounted, setMounted] = useState(false)
    const transitionDirection = useLayoutStore( state => state.transitionDirection)

    useEffect(() => {
        setMounted(true)
        return () => {
            setMounted(false)
        }
    // eslint-disable-next-line 
    }, []);

    return (
        <>
            <Transition mounted={ mounted }  transition={transitionDirection} duration={100} timingFunction="ease">
                {(styles) => 
                    <Card padding="md" radius="md" style={{  ...styles, width:"100%", maxWidth: 480, minWidth: 300, overflow: "visible" }}>
                        { props.children }
                    </Card >
                }
            </Transition>
        </>
    );
}

export default StackCard;

