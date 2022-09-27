import React from 'react';
import { friendlyNameByEndpointId } from 'endpoint-model/discovery'
import PullUpCard from 'layout/pullup/PullUpCard'
import { ActionIcon, Grid } from '@mantine/core'
import { IconMaximize, IconChevronUp, IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons';

const AppleTVPullUp = props => {

    // const { powerStateBool: on } = usePowerState(props.endpointId)
    const name = friendlyNameByEndpointId(props.endpointId) 


    return (
        <PullUpCard name={name} title={name}  >
            <Grid justify="center" style={{ width: 196}}>
                <Grid.Col span={12} style={{ display: "flex", height: 64, justifyContent: "center", alignItems: "center"}}>                    
                    <ActionIcon>
                        <IconChevronUp size={20} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={4} style={{ display: "flex", height: 64, justifyContent: "center", alignItems: "center"}}>           
                    <ActionIcon>
                        <IconChevronLeft size={20} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={4} style={{ display: "flex", height: 64, justifyContent: "center", alignItems: "center"}}>           
                    <ActionIcon>
                        <IconMaximize size={20} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={4} style={{ display: "flex", height: 64, justifyContent: "center", alignItems: "center"}}>           
                    <ActionIcon>
                        <IconChevronRight size={20} />
                    </ActionIcon>
                </Grid.Col>
                <Grid.Col span={12} style={{ display: "flex", height: 64, justifyContent: "center", alignItems: "center"}}>             
                    <ActionIcon>
                        <IconChevronDown size={20} />
                    </ActionIcon>
                </Grid.Col>
            </Grid>
        </PullUpCard>
    );
}

export default AppleTVPullUp;
