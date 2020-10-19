import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Star';
import ListIcon from '@material-ui/icons/List';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import ButtonItem from '../ButtonItem';

export default function AutomationItem(props) {
    
    
    function summary() {
        if (props.allowEdit) {
            return props.automation.triggers.length+" triggers / "+props.automation.conditions.length+" conditions / "+props.automation.actions.length+' actions'
        } else {
            return " "
        }
    }
    
    // noGrid={props.noGrid} nolist={true} noMargin={props.noMargin} noback={true} noPaper={false} button={false}
    return (
            <ButtonItem
                avatarIcon={ props.favorite && props.icon!=="base" ? <FavoriteIcon/> : <ListIcon /> }
                avatarState={props.favorite ? "on": "off" }
                avatarClick={() => props.makeFavorite('logic:activity:'+props.name, !props.favorite)}
                avatarBackground={false}
                label={ props.name }
                labelSecondary={ summary() }
                small={ props.small }
                action={() => props.select(props.name) }
                labelClick={true}
                loading={props.launched}
                secondary={
                    <>
                        { props.deleting ?
                            <IconButton size={"small"} onClick={ () => props.delete(props.name) } >
                                <CloseIcon />
                            </IconButton>
                        :
                            <IconButton size={"small"} onClick={ () => { props.run(props.name) }} >
                                <PlayArrowIcon />
                            </IconButton>                
                        }
                    </>
                }
            />
    );

}

AutomationItem.defaultProps = {
    launcher: false,
    allowEdit: true,
    deleting: false
}

