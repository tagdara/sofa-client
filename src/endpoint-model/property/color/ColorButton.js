import React, { useState} from 'react';
import { Button } from '@mantine/core'
import useColor from 'endpoint-model/property/color/useColor'
import ColorPopover from 'endpoint-model/property/color/ColorPopover'
import { useMantineTheme } from '@mantine/core';

export default function ColorButton(props) {

    const theme = useMantineTheme(); 
    const { colorHex } = useColor(props.endpointId, props.value, props.directive)
    const [ showPopover, setShowPopover] = useState(false)

    return (
        <ColorPopover   target={ <Button 
                                    styles={{     
                                        root: {
                                            backgroundColor: colorHex,
                                            '&:hover': {
                                                backgroundColor: theme.fn.darken(colorHex, 0.05),
                                            }
                                        }
                                    }}
                                    onClick={ () => setShowPopover(!showPopover) } 
                                    color={colorHex} 
                                    size={props.size ? props.size : "sm"}>
                                        { colorHex }
                                    </Button> 
                                }
                        open={showPopover}
                        setOpen={setShowPopover}
                        directive={props.directive}
                        value={props.value}
                        endpointId={props.endpointId}
        />
    );
}

