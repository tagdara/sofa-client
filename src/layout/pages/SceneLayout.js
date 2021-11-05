import React from 'react';
import { endpointIdsByDisplayCategory, sortByName } from 'store/deviceHelpers';

import Scene from 'devices/Scene/Scene';
import GridSection from 'components/GridSection';

const SceneLayout = props => {

    const scenes = props.scenes ? props.scenes : sortByName(endpointIdsByDisplayCategory('SCENE_TRIGGER'))

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
