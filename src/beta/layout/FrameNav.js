import React, { useState } from 'react';

import { Group, Navbar } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { Settings } from 'react-feather';

import UserNav from 'beta/layout/UserNav'
import NavButton from 'beta/layout/NavButton'
import SettingsList from 'beta/layout/SettingsList'

const FrameNav = props => {

    const wide = useMediaQuery('(min-width: 640px)');
    const [ navMode, setNavMode] = useState(undefined)
    const powerUser = true

    function close() {
        setNavMode(undefined)
    }

    return (
        <Navbar height={"100%"} 
                hiddenBreakpoint="xl"
                padding="sm" 
                hidden={ !props.opened }
                fixed = {!wide}
                width={{ sm: 400 }}
                style={{ maxWidth: wide ? "33vw" : undefined,
                        minWidth: wide ? "20vw" : undefined
                }}
            >
            <Navbar.Section style={{ paddingBottom: 8, paddingTop: "env(safe-area-inset-top)" }}>
                <UserNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            </Navbar.Section>
            <Navbar.Section mt="sm" grow sx={{ paddingTop: 8 }}>
                { ( navMode === "settings" && powerUser ) && <SettingsList /> }
            </Navbar.Section>
            <Navbar.Section mt="sm" >
                <Group noWrap spacing="xs" direction="column">
                    { ( navMode !== "settings" && powerUser ) &&
                        <NavButton highlight arrow icon={<Settings size={20} />} label="Settings" onClick={() => setNavMode('settings')} />
                    }
                </Group>
            </Navbar.Section>
            { !wide &&  <Navbar.Section style={{ paddingTop: 8, paddingBottom: "env(safe-area-inset-bottom)" }}>
                            <NavButton highlight label={"Back to player"} arrow onClick={close} />
                        </Navbar.Section>
            }
        </Navbar>
    )
}

export default FrameNav