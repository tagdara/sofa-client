import React from 'react';
import SectionFrame from 'layout/section/SectionFrame'
import useActivityEditorStore from 'activity/editor/activityEditorStore'
//import ReactJson from 'react-json-view';
import { JsonViewer  } from '@textea/json-viewer'
import { modifyActivityJson } from 'activity/editor/activityEditorHelpers'

export const ocean = {
    scheme: 'Ocean',
    author: 'Chris Kempson',
    base00: '#2b303b',
    base01: '#343d46',
    base02: '#4f5b66',
    base03: '#65737e',
    base04: '#a7adba',
    base05: '#c0c5ce',
    base06: '#dfe1e8',
    base07: '#eff1f5',
    base08: '#bf616a',
    base09: '#d08770',
    base0A: '#ebcb8b',
    base0B: '#a3be8c',
    base0C: '#96b5b4',
    base0D: '#8fa1b3',
    base0E: '#b48ead',
    base0F: '#ab7967'
}

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
            <JsonViewer   
                theme={ocean}
                value={activity} 
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
