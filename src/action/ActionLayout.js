import React, { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@mui/styles';

//import 'react-sortable-tree/style.css';
import Grid from '@mui/material/Grid';
import ActionAction from './ActionAction';
//import ActionFooter from './action/ActionFooter';
import TreeHeader from './TreeHeader';
import { NetworkContext } from '../archive/NetworkProvider';
//import { SortableList } from "./action/SortableList"
//import SortableTree from 'react-sortable-tree';
import IconButton from '@mui/material/IconButton';
import Tree, { useTreeState, treeHandlers,} from 'react-hyper-tree'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const useStyles = makeStyles(theme => {
    return {       
        node: {
            display: "flex",
            alignItems: "center",
        },
        indent: {
            minWidth: 24,
        },
        expandButton: {
            height: 24,
        },
        dragZoneItem: {
            //transition: background-color 0.2s ease;
            //background-color: transparent;
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
        },
        dragZoneItemSelect: {
            width: "100%",
            height: "100%",
            //backgroundColor: "#F00",
            backgroundColor: "rgba(179, 255, 192, 0.5)",
        },
        dragZoneVisible: {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            visibility: "visible",
            opacity: 1,
        },
        dragZoneInvisible: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            visibility: "hidden",
            opacity: 0,
        }
    }
});

export default function Action(props) {
    
    const classes = useStyles();
    const [data, setData]=useState([])
    const { getJSON } = useContext(NetworkContext);

    useEffect(() => {

        getJSON('list/logic/automation/test')
            .then(result=>parseAutomation(result))
    // eslint-disable-next-line         
    }, []);
    
    //function save(data) {
    //    setAutomation({...automation, 'actions': data})
    //}
    
    function parseAutomation(automation) {
        var data=automation.actions
        var outlist=data
        returnActions(outlist)
    }
    
    const getDepthPx = (depth: number, depthGap: number): string => `${depth * depthGap}px`
    
    const renderDragZone = useCallback( ({ depth, depthGap, isDragging, node, onDragEnterAfter, onDragEnterBefore, onDragEnterChildren, onDragLeave }) => 
        {
        
        function checkNodeType(node, pos) {
            if (pos==="before") {
                try {
                    if (node.data.data.type==="command") { return true }
                }
                catch {}
            }
            if (pos==="children") {
                try {
                    if (['Actions', 'Then', 'Else'].includes(node.data.name)) { return true }
                }
                catch {}
            }
            if (pos==="after") {
                try {
                    if (node.data.data.type==="command") { return true }
                }
                catch {}
            }
            return false
        }    
        
        return (
        
            <div
                className={!!isDragging ? classes.dragZoneVisible : classes.dragZoneInvisible }
                style={{ marginLeft: getDepthPx(depth, depthGap) }}
                onDragLeave={onDragLeave}
              >
                { checkNodeType(node, 'before') &&
                <div
                    className={node.getNodeDropContainer() === 'before' ? classes.dragZoneItemSelect : classes.dragZoneItem }
                    onDragEnter={onDragEnterBefore}
                />
                }
                { checkNodeType(node, 'children') &&
                <div
                    className={node.getNodeDropContainer() === 'children' ? classes.dragZoneItemSelect : classes.dragZoneItem }
                    onDragEnter={onDragEnterChildren}
                />
                }
                { checkNodeType(node, 'after') &&
                <div
                    className={node.getNodeDropContainer() === 'after' ? classes.dragZoneItemSelect : classes.dragZoneItem }
                    onDragEnter={onDragEnterAfter}
                />
                }
              </div>
            )
        // eslint-disable-next-line    
        }, [])

    const renderNode = useCallback(({ node, onToggle, }) => (
        <div className={classes.node} key={node.data.title}>
            { node.hasChildren() ?
                <IconButton aria-label="delete" size="small" onClick={onToggle} className={classes.expandButton}>
                    { node.options.opened ? <ArrowDropDownIcon fontSize="inherit" /> : <ArrowRightIcon fontSize="inherit" /> }
                </IconButton>
                :
                <div className={classes.indent} />
            }
            { node.data.hasOwnProperty('data') ?
                <ActionAction data={node.data.data} /> 
                :
                <TreeHeader name={node.data.name} selected={ node.isSelected()} childCount={node.options.childrenCount}
                            onClick={ () => treeHandlers.trees.tree.handlers.setSelected(node,!node.isSelected(),) } />
            }
        </div>
        // eslint-disable-next-line    
        ), [])
        

    function returnActions(actiondata) {
        
        console.log('Actions?', actiondata)
        var objlist=[]

        for (var j = 0; j < actiondata.length; j++) {
            if (actiondata[j].endpointId==='logic.logic.if') {
                var ifthens=[]
                var ifelses=[]
                console.log('j',actiondata[j])
                for (var k = 0; k < actiondata[j]['value']['then'].length; k++) {
                    ifthens.push({ id: j*100 + k, name: actiondata[j]['value']['then'][k].endpointId, title: "XX", data: actiondata[j]['value']['then'][k], type: "action" })
                }
                for (var l = 0; l < actiondata[j]['value']['else'].length; l++) {
                    ifelses.push({ id: j*100 + l+k, name: actiondata[j]['value']['else'][l].endpointId, title: "XX", data: actiondata[j]['value']['else'][l], type: "action"})
                }  
                    
                var ifblock={
                                id: j+2,
                                name: "If",
                                children: [
                                    {   id: j*10 + 1,
                                        name: "Then",
                                        children: ifthens
                                    },
                                    {   id: j*10 + 2,
                                        name: "Else",
                                        children: ifelses
                                    }
                                ]
                            }
                objlist.push(ifblock)

            } else {
                objlist.push({ id: j+2, name: actiondata[j].endpointId, title: "XX", data: actiondata[j]})
            }
        }

        var actionData = {
            id: 2,
            name: 'Actions',
            children: objlist
        }
        
        console.log('Actiondata', actionData)
        setData(actionData)
        return actionData
        
    }
    
    const { required, handlers } = useTreeState({
        id: 'tree',
        data: data,
        defaultOpened: true,
        multipleSelect: false,
    })
    
    
    //renderDragZone={renderDragZone}
    return (
        <Grid container item spacing={1} xs={12} >
            <Grid item xs={12} >
                <Tree {...required} {...handlers}
                    horizontalLineStyles={{
                        stroke: '#c4c4c4',
                        strokeWidth: 1,
                        strokeDasharray: '1 4',
                    }}
                    verticalLineStyles={{
                        stroke: '#c4c4c4',
                        strokeWidth: 1,
                        strokeDasharray: '1 4',
                    }}
                    draggable={true}
                    depthGap={20}
                    disableLines={false}
                    disableHorizontalLines={false}
                    disableVerticalLines={false}
                    verticalLineTopOffset={-17}
                    verticalLineOffset={5}
                    renderNode={renderNode}
                    renderDragZone={renderDragZone}
                />
            </Grid>
        </Grid>
    )
    
};
