import React from 'react';
import { ActionIcon, Button, Group, Space} from '@mantine/core'
import { IconArrowLeft, IconHome } from '@tabler/icons';

const AreaControlHeader = (props) => {

    return (
        <Group noWrap style={{ width: "100%"}} position="apart" >
            { props.currentArea !== "logic:area:all" ?
                <ActionIcon size="lg" onClick={()=>props.selectArea("logic:area:all")}>
                    <IconArrowLeft size={20}  />
                </ActionIcon>
                :
                <Space w="md" />
            }
            <Button variant="light" size="md" onClick={() => props.expand(props.currentArea)} >
                {props.name}
            </Button>
            { props.currentArea !== props.home ?
                <ActionIcon size="lg" onClick={()=>props.selectArea(props.home)}>
                    <IconHome size={20} />
                </ActionIcon >
                :
                <Space w="xl" />
            }
        </Group>
    )
};

export default AreaControlHeader