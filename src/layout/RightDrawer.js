import React, { useState } from 'react';
import { Button, Drawer, Stack, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { IconLogin } from '@tabler/icons';

import NavButton from 'layout/NavButton';

const RightDrawer = props => {

    const [contextItem, setContextItem] = useState(undefined)
    const wide = useMediaQuery('(min-width: 640px)');
    const notifications = useNotifications();       
    const powerUser = true

    function closeDrawer() {
        props.close()
        setContextItem(undefined)
    }

    function notifyAction() {
        notifications.showNotification({
            autoClose: 5000,
            title: "Attention",
            message: "You did a notify thing " 
          })
    }

    return (
        <Drawer position="right"
                opened={ props.open }
                onClose={ closeDrawer}
                padding="sm" 
                size="xl"
                styles={{ 
                            drawer: { maxHeight: "100vh", 
                                    marginTop: 72,
                                    paddingTop: "calc(16px + env(safe-area-inset-top))", 
                                    display: "flex", 
                                    flexDirection: "column",
                                    maxWidth: wide ? "33vw" : undefined,
                                    zIndex:5000,
                                } }}
            >
            <Stack spacing="sm" style={{ flexGrow: 1, paddingBottom: "env(safe-area-inset-bottom)" }} >
                { contextItem ?
                    <Stack>
                        <Button>Context Item</Button>
                    </Stack>
                    :
                    <Stack>
                        <Button>No context</Button>
                    </Stack>                 
                }
                <ScrollArea>
                    <Stack>
                        <Button>Main</Button>
                    </Stack> 
                </ScrollArea>
                { contextItem &&
                    <Stack spacing="xs" noWrap >
                        { powerUser && <NavButton highlight label={"Use this "+contextItem} 
                            color="transparent" icon={<IconLogin size={20} />} reverse  /> 
                        }
                        <NavButton highlight label={"Back"} leftArrow reverse onClick={notifyAction} />
                    </Stack>
                }
                { (!wide && !contextItem) && 
                    <NavButton highlight label={"Back to app"} leftArrow reverse onClick={closeDrawer} />
                }
            </Stack>
        </Drawer>
    )
}

export default RightDrawer