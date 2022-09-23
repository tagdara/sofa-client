import React from 'react';
import { Menu } from '@mantine/core';
import { isFavorite, removeFavorite, makeFavorite } from 'user/favorites/favoritesUtils';

const ActivityItemMenu = props => {

    return  (
        <Menu>
            <Menu.Target>
                {props.target}
            </Menu.Target> 
            <Menu.Dropdown>
            {  isFavorite(props.endpointId) ?
                <Menu.Item
                    onClick={() => removeFavorite(props.endpointId)}
                >
                    Unfavorite
                </Menu.Item>
                :
                <Menu.Item
                    onClick={() => makeFavorite(props.endpointId)}
                >
                    Mark as favorite
                </Menu.Item>             
            }
                <Menu.Item
                    onClick={ () => props.run(false)}
                >
                    Run without conditions
                </Menu.Item>
                <Menu.Item
                    onClick={ () => props.delete(props.endpointId)}
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown> 
        </Menu>
    )
}

export default ActivityItemMenu

