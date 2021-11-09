import React from 'react';
import ToggleAvatar from 'components/ToggleAvatar'
import CircularProgress from '@mui/material/CircularProgress';

const ListItemAvatar = props => {
    
    if (props.loading) {
        return  <div style={{ marginLeft: 8, marginTop: 8, marginRight: 24 }} >
                    <CircularProgress size={24} />
                </div>
    }

    function handleAvatarClick(e) {
        if (props.onClick) {
            e.stopPropagation(); 
            props.onClick()
        }
    }

    console.log('back', props.background)

    return (
        <ToggleAvatar   small={props.small} wideAvatar={props.wide} 
                        avatarState={ props.state } 
                        noback={ !props.background } 
                        onClick={ handleAvatarClick } >
            { props.children }
        </ToggleAvatar>
    );
}

ListItemAvatar.defaultProps = {
    state: "off",
}

export default ListItemAvatar;


