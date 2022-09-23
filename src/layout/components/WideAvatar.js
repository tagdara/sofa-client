import React from 'react';
import { Avatar } from '@mantine/core';

export default function WideAvatar(props) {

    const left = props.left && typeof props.left !== 'object' ? <span>{props.left}</span> : props.left
    const right = props.right && typeof props.right !== 'object' ? <span>{props.right}</span> : props.right  

    // placeholder: { flexWrap: "nowrap", display: "flex", flex: 1, padding: "0 8px"}
     
    return (
        <Avatar onClick={props.onClick}
                color={props.color} 
                size={props.size} 
                styles={{ root: { display: "flex", flexShrink: 0, flexGrow:0, flexBasis: "content",  width: "unset"}, placeholder: { padding: "0 16px"} }}>
            <div style={{alignItems: "center", flexWrap: "nowrap", display: "flex", gap: 8 }}>
                { left }
                { right }
            </div>
        </Avatar>
    );
}


