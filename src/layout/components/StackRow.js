import React, { useEffect, useState} from 'react';
import { Transition } from '@mantine/core'
import useLayoutStore from 'layout/layoutStore'

const StackRow = props => {
	  
    const [mounted, setMounted] = useState(false)
    const transitionDirection = useLayoutStore( state => state.transitionDirection)

    useEffect(() => {
        setMounted(!props.hidden)
        return () => {
            setMounted(false)
        }
    // eslint-disable-next-line 
    }, [ props.hidden ]);

    return (
            <Transition mounted={ mounted }  transition={transitionDirection} exitDuration={1000} duration={100} timingFunction="ease">
                {(styles) => 
                    <div 
                        style={{  
                            ...styles, 
                            width:"100%", 
                            maxWidth: 480, 
                            minWidth: 300, 
                            overflow: "visible",
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        { props.children }
                    </div>
                }
            </Transition>
    );
}

export default StackRow;

