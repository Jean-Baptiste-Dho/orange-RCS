import { useState, useCallback, useRef } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    type OnConnect,
    type Node,
    type Edge,
    ReactFlowProvider,
    useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './App.css'
import LeftSidebar from './components/LeftSidebar'
import RightSidebar from './components/RightSidebar'
import RcsNode from './components/nodes/RcsNode'
import WorkflowList from './pages/WorkflowList'

const nodeTypes = { rcsNode: RcsNode }

let nodeId = 1
const getId = () => `node_${nodeId++}`

function FlowCanvas({ selectedNode, setSelectedNode }: {
    selectedNode: Node | null
    setSelectedNode: (n: Node | null) => void
}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const reactFlowWrapper = useRef<HTMLDivElement>(null)
    const { screenToFlowPosition } = useReactFlow()

    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge({ ...connection, animated: true, style: { stroke: '#FF6B00' } }, eds)),
        [setEdges]
    )

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    }, [])

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault()
            const type = event.dataTransfer.getData('application/rcsnode')
            const label = event.dataTransfer.getData('application/rcsnodelabel')
            if (!type) return
            const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
            const newNode: Node = {
                id: getId(),
                type: 'rcsNode',
                position,
                data: { label, type, text: '', buttons: [] },
            }
            setNodes((nds) => nds.concat(newNode))
        },
        [screenToFlowPosition, setNodes]
    )

    const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
        setSelectedNode(node)
    }, [setSelectedNode])

    const onPaneClick = useCallback(() => {
        setSelectedNode(null)
    }, [setSelectedNode])

    const updateNodeData = useCallback((id: string, newData: Record<string, unknown>) => {
            setNodes((nds) =>
                nds.map((n) => n.id === id ? { ...n, data: { ...n.data, ...newData } } : n)
            )
            if (selectedNode?.id === id) {
                setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, ...newData } })
            }
        }, [setNodes, selectedNode, setSelectedNode])

        // eslint-disable-next-line react-hooks/immutability
    ;(window as unknown as Record<string, unknown>).__updateNodeData = updateNodeData
    // eslint-disable-next-line react-hooks/immutability
    ;(window as unknown as Record<string, unknown>).__deleteNode = (id: string) => {
        setNodes((nds) => nds.filter((n) => n.id !== id))
        setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
    }
    // eslint-disable-next-line react-hooks/immutability
    ;(window as unknown as Record<string, unknown>).__getWorkflow = () => ({ nodes, edges })

    return (
        <div className="canvas-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                deleteKeyCode="Backspace"
            >
                <Background color="#e0e0e0" gap={20} />
                <Controls />
                <MiniMap nodeColor="#FF6B00" maskColor="rgba(0,0,0,0.05)" />
            </ReactFlow>
        </div>
    )
}

function EditorPage() {
    const [selectedNode, setSelectedNode] = useState<Node | null>(null)
    const navigate = useNavigate()

    return (
        <div className="app-layout">
            <header className="app-header">
                <button className="header-back" onClick={() => navigate('/')}>‹ Retour</button>
                <span className="header-title">Orange RCS / Workflow Builder V.1.0.0</span>
            </header>
            <div className="app-body">
                <LeftSidebar />
                <ReactFlowProvider>
                    <FlowCanvas selectedNode={selectedNode} setSelectedNode={setSelectedNode} />
                </ReactFlowProvider>
                <RightSidebar selectedNode={selectedNode} />
            </div>
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WorkflowList />} />
                <Route path="/editor/:id" element={<EditorPage />} />
            </Routes>
        </BrowserRouter>
    )
}