import React from 'react';
import { ArrowLeft, Home } from 'react-feather'
import { ActionIcon, Button, Group, Space} from '@mantine/core'

const AreaControlHeader = (props) => {

    return (
        <Group noWrap style={{ width: "100%"}} position="apart" >
            { props.currentArea !== "logic:area:all" ?
                <ActionIcon onClick={()=>props.selectArea("logic:area:all")}>
                    <ArrowLeft size={16}  />
                </ActionIcon>
                :
                <Space w="md" />
            }
            <Button compact variant="light" size="xs" onClick={() => props.expand(props.currentArea)} >
                {props.name}
            </Button>
            { props.currentArea !== props.home ?
                <ActionIcon onClick={()=>props.selectArea(props.home)}>
                    <Home size={16} />
                </ActionIcon >
                :
                <Space w="xl" />
            }
        </Group>
    )
};

export default AreaControlHeader