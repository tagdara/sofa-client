import React from 'react';
import SectionFrame from 'layout/SectionFrame'
import useActivityEditorStore from 'store/activityEditorStore'
//import ReactJson from 'react-json-view';
import ReactJson from '@textea/json-viewer'
import { modifyActivityJson } from 'store/activityEditorHelpers'

export default function ActivityEditor(props) {

    const activity = useActivityEditorStore( state => state.activity )

    const modifyActivity = data => {
        console.log('Data', data)
        modifyActivityJson(data)
        // {
        //    updated_src: src, //new src value
        //    name: name, //new var name
        //    namespace: namespace, //list, namespace indicating var location
        //    new_value: new_value, //new variable value
        //    existing_value: existing_value, //existing variable value
        // }
        // setActiviy
    }
    return (
        <SectionFrame>
            <ReactJson  theme={"hopscotch"} 
                        src={activity} 
                        collapsed={2}
                        quotesOnKeys={false}
                        displayDataTypes={false}
                        onEdit={modifyActivity}
                        onAdd={modifyActivity}
                        onDelete={modifyActivity}
            />
        </SectionFrame>
    )
};
