import React from 'react';
import { Avatar, useMantineTheme } from '@mantine/core';

export default function WideAvatar(props) {
    
    const theme = useMantineTheme()
    const left = props.left && typeof props.left !== 'object' ? <span>{props.left}</span> : props.left
    const right = props.right && typeof props.right !== 'object' ? <span>{props.right}</span> : props.right  

    const themePaper = theme.colors.dark[7]

    return (
        <Avatar 
            onClick={ props.onClick }
            color={ props.color !== "paper" ? props.color : undefined } 
            size={props.size} 
            radius={props.radius}
            styles={{ 
                root: { 
                    backgroundColor: props.color === "paper" ? themePaper : undefined,
                    height: props.height, 
                    display: "flex", 
                    flexShrink: 0, 
                    flexGrow:0, 
                    flexBasis: "content",  
                    width: "unset"
                }, 
                placeholder: { 
                    padding: "0 16px"
                } 
            }}
        >
            <div style={{alignItems: "center", flexWrap: "nowrap", display: "flex", gap: 8 }}>
                { left }
                { right }
            </div>
        </Avatar>
    );
}


