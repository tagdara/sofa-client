import React, { useContext } from 'react';
import { DeviceContext } from 'context/DeviceContext';

import Scene from 'devices/Scene/Scene';
import GridSection from 'components/GridSection';

const SceneLayout = props => {

    const { endpointIdsByCategory, sortByName } = useContext(DeviceContext);
    const scenes = props.scenes ? props.scenes : sortByName(endpointIdsByCategory('SCENE_TRIGGER'))

    return (    
        <GridSection name={"Scenes"} scroll={true} >
            { scenes.map( endpointId =>
                <Scene  key={ endpointId } endpointId={endpointId} small={true} 
                        edit={props.edit} remove={props.remove} />
            )}
        </GridSection>
    )
}

export default SceneLayout;
