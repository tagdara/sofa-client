import React, { useState } from 'react';

import { Group, Navbar, ScrollArea } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { List, Settings } from 'react-feather';

import UserNav from 'layout/UserNav';
import NavButton from 'layout/NavButton';
import Favorites from 'layout/Favorites';
import SettingsList from 'admin/SettingsList'
import { selectPage } from 'helpers/layoutHelpers';

const FrameNav = props => {

    const wide = useMediaQuery('(min-width: 640px)');
    const [ navMode, setNavMode] = useState('activities')
    const powerUser = true

    return (
        <Navbar hiddenBreakpoint={4000}
                padding="sm" 
                hidden={ !props.opened }
                fixed 
                width={{ sm: 400 }}
                style={{    maxWidth: wide ? "33vw" : undefined,
                            minWidth: wide ? "20vw" : undefined,
                            height: "100%",
                            maxHeight: "100%",
                            overflow: "hidden",
                            boxSizing: "border-box"
                }}
            >
            <Navbar.Section style={{ paddingBottom: 8, paddingTop: "env(safe-area-inset-top)" }}>
                <UserNav expand={navMode === "user"} action={ () => setNavMode('user')} />
            </Navbar.Section>
            <Navbar.Section mt="sm" grow sx={{ paddingTop: 8 }} component={ScrollArea}>
                { ( navMode === "activities" ) && <Favorites /> }
                { ( navMode === "settings" && powerUser ) && <SettingsList /> }
            </Navbar.Section>
            <Navbar.Section mt="sm" >
                <Group noWrap spacing="xs" direction="column">
                    { ( navMode === "activities" && powerUser ) &&
                        <NavButton highlight arrow icon={<List size={20} />} label="All Activities" onClick={ () => { selectPage('ActivitiesPage', {'favorites':false}) } } />
                    }
                </Group>
            </Navbar.Section>
            <Navbar.Section style={{ paddingTop: 8, paddingBottom: "env(safe-area-inset-bottom)" }}>
                <Group noWrap spacing="xs">
                    { ( navMode !== "settings" && powerUser ) &&
                        <NavButton highlight icon={<Settings size={20} />} label="Settings" onClick={() => setNavMode('settings')} />
                    }
                    { ( navMode !== "activities"  ) &&
                        <NavButton highlight icon={<List size={20} />} label="Activities" onClick={() => setNavMode('activities')} />
                    }
                    <NavButton highlight label={"Back to Home"} arrow onClick={props.close} />
                </Group>
            </Navbar.Section>
        </Navbar>
    )
}

export default FrameNav