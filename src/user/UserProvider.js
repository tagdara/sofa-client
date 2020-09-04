import React, {useState, useEffect, useContext, createContext} from 'react';
import { NetworkContext } from '../NetworkProvider';

export const UserContext = createContext();

export default function UserProvider(props) {

    const [ userData, setUserData ] = useState({});
    const { getJSON, postJSON, loggedIn } = useContext(NetworkContext);
    const [ favorites, setFavorites] = useState([])
    const [ userCamera, setUserCamera] = useState(undefined)
    const [ userTheme, setUserTheme] = useState(undefined)
    const [ userPlayer, setUserPlayer] = useState(undefined)
    
    useEffect(() => {
        
        function parseResult(result) {
            if (result) {
                if (result.hasOwnProperty('favorites')) {
                    setFavorites(result.favorites)
                }
                if (result.hasOwnProperty('camera')) {
                    setUserCamera(result.camera)
                }
                if (result.hasOwnProperty('player')) {
                    setUserPlayer(result.player)
                }
                
                if (result.hasOwnProperty('theme')) {
                    setUserTheme(result.theme)
                }
                setUserData(result)
            }
        }
        
        if (loggedIn) {
      	    getJSON('user')
                .then(result=>parseResult(result))
        } else {
            setUserData({})
        }
    // eslint-disable-next-line 
    }, [ loggedIn] )
    
    function saveUserData(data) {
        postJSON('user/save', data)
            .then(result=>console.log('saved user setting change',result))
    }
    
    function chooseUserCamera(cameraId) { 
        if (cameraId!==userCamera) {
            setUserCamera(cameraId)
            setUserData({...userData, camera: cameraId })
            saveUserData({...userData, camera: cameraId })
        }
    }

    function chooseUserPlayer(playerId) { 
        if (playerId!==userPlayer) {
            setUserPlayer(playerId)
            setUserData({...userData, player: playerId })
            saveUserData({...userData, player: playerId })
        }
    }


    function chooseUserTheme(themeName) { 

        if (themeName!==userTheme) {
            setUserTheme(themeName)
            setUserData({...userData, theme: themeName })
            saveUserData({...userData, theme: themeName })
        }
    }

        
    
    function makeFavorite(deviceId, fav=true) {
        var newfavorites=[...favorites]
        if (fav && !userData.favorites.includes(deviceId)) {
            newfavorites=[...newfavorites, deviceId]
            setFavorites(newfavorites)
            setUserData({...userData, favorites: newfavorites })
            saveUserData({...userData, favorites: newfavorites })
        } else if (!fav && userData.favorites.includes(deviceId)) {
            newfavorites=[...userData.favorites]
            newfavorites.splice( newfavorites.indexOf(deviceId), 1 );
            setFavorites(newfavorites)
            setUserData({...userData, favorites: newfavorites })
            saveUserData({...userData, favorites: newfavorites })
        }
    }
    
    function isFavorite(deviceId) {
        return favorites.includes(deviceId)
    }

    return (
        <UserContext.Provider
            value={{
                userData: userData,
                makeFavorite: makeFavorite,
                isFavorite: isFavorite,
                favorites: favorites,
                userCamera: userCamera,
                chooseUserCamera: chooseUserCamera,
                userTheme: userTheme,
                chooseUserTheme: chooseUserTheme,
                userPlayer: userPlayer,
                chooseUserPlayer: chooseUserPlayer,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
