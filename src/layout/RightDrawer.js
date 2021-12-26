import React, { useState } from 'react';
import { Button, Drawer, Group, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { LogIn } from 'react-feather';

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
                hideCloseButton
                styles={{ 
                            drawer: { maxHeight: "100vh", 
                                    paddingTop: "calc(16px + env(safe-area-inset-top))", 
                                    display: "flex", 
                                    flexDirection: "column",
                                    maxWidth: wide ? "33vw" : undefined,
                                } }}
            >
            <Group noWrap direction="column" spacing="sm" grow style={{ flexGrow: 1, paddingBottom: "env(safe-area-inset-bottom)" }} >
                { contextItem ?
                    <Group direction="column" grow>
                        <Button>Context Item</Button>
                    </Group>
                    :
                    <Group direction="column" grow>
                        <Button>No context</Button>
                    </Group>                 
                }
                <ScrollArea>
                    <Group direction="column" grow>
                        <Button>Main</Button>
                    </Group> 
                </ScrollArea>
                { contextItem &&
                    <Group direction="column" grow spacing="xs" noWrap >
                        { powerUser && <NavButton highlight label={"Use this "+contextItem} 
                            color="transparent" icon={<LogIn size={20} />} reverse  /> 
                        }
                        <NavButton highlight label={"Back"} leftArrow reverse onClick={notifyAction} />
                    </Group>
                }
                { (!wide && !contextItem) && 
                    <NavButton highlight label={"Back to app"} leftArrow reverse onClick={closeDrawer} />
                }
            </Group>
        </Drawer>
    )
}

export default RightDrawer