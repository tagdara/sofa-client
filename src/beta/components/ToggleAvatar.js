import React from 'react';
import { Avatar, Badge } from '@mantine/core';

function ToggleAvatar(props) {

    return  (
        props.wideAvatar ?
            <Badge onClick={props.onClick}>{props.children}</Badge>
        :
            <Avatar onClick={props.onClick}>
                {props.children}
            </Avatar>
    )
}

ToggleAvatar.defaultProps = {
    reverse: false,
    noback: false,
    small: false,
    avatarState: "off",
}

export default ToggleAvatar

