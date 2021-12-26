import React from 'react';
import { Avatar } from '@mantine/core';

export default function WideAvatar(props) {

    const left = typeof props.left !== 'object' ? <span>{props.left}</span> : props.left
    const right = typeof props.right !== 'object' ? <span>{props.right}</span> : props.right  

    return (
        <Avatar color={props.color} size={props.size} styles={{ root: { width: "auto" } , placeholder: { flexWrap: "nowrap", display: "flex", flex: 1, gap: 8 } }}>
            <div style={{alignItems: "center", flexWrap: "nowrap", display: "flex", paddingLeft:24, paddingRight: 24, gap: 8 }}>
                { left }
                { right }
            </div>
        </Avatar>
    );
}


