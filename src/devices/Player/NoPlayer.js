import React from 'react';
import { useState } from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import GridItem from 'components/GridItem';
import TextField from '@mui/material/TextField';


export default function NoPlayer(props) {
    const [captcha, setCaptcha] = useState('');
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
                            <img src={'/captcha.jpg'} alt={"captcha"} />
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
