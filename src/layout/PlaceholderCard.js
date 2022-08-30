import React from "react";
import { Card, Group, Stack } from '@mantine/core';

export default function PlaceholderCard(props){
    
    function isInset(children) {
        if (props.inset) {
            return <div>{children} </div>
        } else {
            return  <Card style={{  width: "100%", background: "rgba(0,0,0,0)" }} >
                        { children }
                    </Card>
        }
    }

    return (
        isInset(
            <Stack style={{ width: "100%"}} >
                { [...Array(props.count).keys()].map( index =>
                    <Group key={index}>
                        <div style={{ height: 12}} />
                    </Group>
                )}
            </Stack>
        )
    );

    //return (
    //    isInset(
    //        <Stack style={{ width: "100%"}} >
    //            <Skeleton height={20} circle  /> 
     //           { [...Array(props.count).keys()].map( index =>
     //               <Group key={index}>
    //                    <Skeleton height={8} radius="xl" width="90%"/>
    //                    <Skeleton height={8} radius="xl" width="70%"/>
    //                </Group>
    //            )}
    //        </Group>
    //    )
    //);

}

PlaceholderCard.defaultProps={
    inset: false,
    count: 1,
}


