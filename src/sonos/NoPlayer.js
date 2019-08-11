import React from 'react';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import { makeStyles } from '@material-ui/styles';
import GridItem from '../GridItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({

    listItem: {
        width: '100%',
        minHeight: 48,
        padding: "12px 0",
    }
});

export default function NoPlayer(props) {
    const [captcha, setCaptcha] = useState('');
    const classes = useStyles();
    const [showCaptcha, setShowCaptcha]= useState(false)
    
    function sendCaptcha() {
        fetch('/list/echo/captcha/'+captcha)
            .then(result=>result.json())
    }
    
    return (
            <GridItem wide={props.wide} >
                <ListItem>
                    <ListItemAvatar onClick={ () => props.setLayoutCard('PlayersLayout',{})}>
                        <Avatar ><QueueMusicIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Waiting for player data"} onClick={ () => setShowCaptcha(!showCaptcha) } />
                </ListItem>
                { showCaptcha &&
                    <>
                        <ListItem onClick={() => sendCaptcha()}>
                            <img src={'/captcha.jpg'} />
                        </ListItem>
                        <ListItem>
                            <TextField fullWidth label={'Captcha'} value={captcha}
                                onChange={(e) => setCaptcha(e.target.value)}
                            />
                        </ListItem>
                    </>
                }
            </GridItem>
    );

}
