import React from 'react';
import CardBase from "./CardBase"
import SofaListItem from "./SofaListItem"

export default function ButtonItem(props) {
    
    // This should clearly just be deprecated for SofaListItem, but its used in several cards
    
    return (
        <>
        { !props.noGrid ?
            <CardBase noPad={ props.small } highlight={props.highlight}>
                <SofaListItem   avatarState={props.avatarState} avatarBackground={props.avatarBackground} avatarClick={props.avatarClick}
                                onClick={ props.action}
                                avatar={ props.avatarIcon }
                                primary={props.label} secondary={props.labelSecondary}
                                small={props.small} noPad={props.small}
                                secondaryActions={ props.secondary }
                />
                { props.children }
            </CardBase>
            :
            <>
                <SofaListItem   avatarState={props.avatarState} avatarBackground={props.avatarBackground} avatarClick={props.avatarClick}
                                onClick={ props.action}
                                avatar={ props.avatarIcon }
                                primary={props.label} secondary={props.labelSecondary}
                                small={props.small} noPad={props.small}
                                secondaryActions={ props.secondary }
                />
                { props.children }
            </>
        }
        </>
    )    

};

ButtonItem.defaultProps = {
    noPaper: true,
    button: true,
    xs: 12,
}
