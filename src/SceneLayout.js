import React from 'react';
import { useState, useEffect } from 'react';
import { withData } from './DataContext/withData';
import { withLayout } from './layout/NewLayoutProvider';

import SceneSave from "./scene/sceneSave"
import SceneTitle from "./scene/sceneTitle"
import SceneDetails from "./scene/sceneDetails"
import SceneItems from "./scene/sceneItems"

import ToggleButton from './ToggleButton'
import GridBreak from './GridBreak';
import FavoriteIcon from '@material-ui/icons/Favorite';

function SceneLayout(props) {

    const [scene, setScene] = useState({})
    const [favorite, setFavorite] = useState(false)
    const [items, setItems] = useState([])

    const [edit,setEdit] = useState(false)
    const [gotReturn,setGotReturn] = useState(false)
    const [saved, setSaved] = useState(true)
    const [title, setTitle] = useState(props.name)

    useEffect(() => {
        getScene();
    }, []);
    
    function checkCallbackItems(itemtype) {
        if (!gotReturn && props.type==itemtype && props.item) {
            setGotReturn(true)
            return props.item
        }
    }

    function getScene() {
  	    fetch('/list/logic/scene/'+props.name)
 		    .then(result=>result.json())
            .then(result=>loadScene(result));
    }
    
    function loadScene(newscene) {

        var changes=false
        
        setScene(newscene)
        
        if (newscene.hasOwnProperty('favorite')) {
            setFavorite(newscene['favorite'])
        } else {
            setFavorite(false)
        }
        
        if (newscene.hasOwnProperty('items')) {
            var newItems=newscene['items']
        } 
        
        var additem=checkCallbackItems('items')
        if (additem) {
            newItems=[...newitems,additem]
            saveType('items',newItems)
        } else {
            setItems(newItems)
        }
        
        if (changes) {
            setSaved(false)
        }
    }
       
    function runScene(name) {
        props.sendAlexaCommand(name, "logic:scene:"+props.name, "SceneController", "Activate")
    }
    
    function saveType(itemtype, items) {

        if (itemtype=='title') {
            setTitle(items)
        } else if (itemtype=='favorite') {
            setFavorite(items)
        } else if (itemtype=='items') {
            setItems(items)
        }
        setSaved(false)

    }
    
    function saveScene(newitems, newfavorite) {
        
        fetch('/save/logic/scene/'+props.name, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"items": newitems, "favorite": newfavorite})
            })
                .then(result =>setItems(newitems))
                .then(result =>setFavorite(newfavorite))
    }

    function newSaveScene() {
        
        fetch('/save/logic/scene/'+title, {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"items": items, "favorite": favorite})
            })
                .then(setSaved(true))
    }

    
    function saveFavorite(newfavorite) {
        saveType('favorite',newfavorite)
    }

    function saveStub(a,c,t) {
        console.log('Blocked Save',a,c,t)
    }
    
    function goBack() {
        props.applyLayoutCard('AreaLayout',{})
    }

    return (    
        <React.Fragment>
            <SceneTitle name={title} save={saveType} >
                <ToggleButton buttonState={favorite? "on": "off"} onClick={ () => saveFavorite(!favorite) }>
                    <FavoriteIcon fontSize="small" />
                </ToggleButton>
            </SceneTitle>
            <SceneDetails scene={scene} />
            <SceneItems items={actions} saved={saved} save={saveType} automationName={props.name} name={"Actions"} selector={'DeviceDirectiveLayout'} itemModule={'AutomationAction'} itemtype={"action"} />
            <SceneSave name={title} saved={saved} save={newSaveAutomation} goBack={goBack} />
        </React.Fragment>
    )
};

export default withData(withLayout(SceneLayout));