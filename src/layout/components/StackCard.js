import React, { useEffect, useState} from 'react';
import { Card, Transition } from '@mantine/core'
import useLayoutStore from 'layout/layoutStore'

const StackCard = props => {
	  
    const [mounted, setMounted] = useState(false)
    const transitionDirection = useLayoutStore( state => state.transitionDirection)

    useEffect(() => {
        setMounted(!props.hidden)
        console.log(transitionDirection)
        return () => {
            setMounted(false)
        }
    // eslint-disable-next-line 
    }, [ props.hidden ]);

    return (
            <Transition mounted={ mounted }  transition={transitionDirection} exitDuration={1000} duration={100} timingFunction="ease">
                {(styles) => 
                    <Card 
                        padding="md" 
                        radius="md" 
                        style={{  
                            ...styles, 
                            width:"100%", 
                            maxWidth: 480, 
                            minWidth: 300, 
                            overflow: "visible",
                            
                        }}
                    >
                        { props.children }
                    </Card >
                }
            </Transition>
    );
}

export default StackCard;

