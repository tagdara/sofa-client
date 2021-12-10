import React from "react";
import { Card, Group, Skeleton } from '@mantine/core';

export default function PlaceholderCard(props){
    
    function isInset(children) {
        if (props.inset) {
            return <div>{children} </div>
        } else {
            return  <Card style={{  width: "100%"}} >
                        { children }
                    </Card>
        }
    }

    return (
        isInset(
            <Group direction="column" noWrap style={{ width: "100%"}} >
                <Skeleton height={20} circle  /> 
                { [...Array(props.count).keys()].map( index =>
                    <Group key={index}>
                        <Skeleton height={8} radius="xl" width="90%"/>
                        <Skeleton height={8} radius="xl" width="70%"/>
                    </Group>
                )}
            </Group>
        )
    );

}

PlaceholderCard.defaultProps={
    inset: false,
    count: 1,
}


