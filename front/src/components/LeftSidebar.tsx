const tools = [
    { type: 'text',       label: 'Zone de texte simple',     icon: '𝐓'   },
    { type: 'textBadge',  label: 'Zone de texte certifiée',  icon: '𝐓✓'  },
    { type: 'media',      label: "Zone d'image / Média",     icon: '🖼'  },
    { type: 'variable',   label: 'Champ variable',           icon: '[ ]' },
    { type: 'quickReply', label: 'Bouton de réponse rapide', icon: '⚡'  },
    { type: 'urlAction',  label: "Bouton d'action URL",      icon: '🔗'  },
    { type: 'carousel',   label: 'Carte de carrousel',       icon: '⊞'  },
    { type: 'system',     label: "Bouton d'action système",  icon: '⚙'  },
    { type: 'keyword',    label: 'Déclencheur par mot-clé',  icon: '🔍' },
]

interface RawNode {
    id: string
    data: {
        label?: string
        type?: string
        text?: string
        buttons?: { id: string; label: string }[]
        imageUrl?: string
        keyword?: string
        url?: string
    }
}

interface RawEdge {
    id: string
    source: string
    target: string
    sourceHandle?: string | null
}

export default function LeftSidebar() {
    const onDragStart = (event: React.DragEvent, type: string, label: string) => {
        event.dataTransfer.setData('application/rcsnode', type)
        event.dataTransfer.setData('application/rcsnodelabel', label)
        event.dataTransfer.effectAllowed = 'move'
    }

    const handleSave = () => {
        const fn = (window as unknown as Record<string, unknown>).__getWorkflow as
            | (() => { nodes: RawNode[]; edges: RawEdge[] })
            | undefined
        if (!fn) return

        const { nodes, edges } = fn()

        const cleanNodes = nodes.map((n) => ({
            id: n.id,
            type: n.data.type,
            data: {
                label:    n.data.label,
                text:     n.data.text,
                buttons:  n.data.buttons,
                ...(n.data.imageUrl && { imageUrl: n.data.imageUrl }),
                ...(n.data.keyword  && { keyword:  n.data.keyword  }),
                ...(n.data.url      && { url:       n.data.url      }),
            },
        }))

        const cleanEdges = edges.map((e) => ({
            id:              e.id,
            source:          e.source,
            target:          e.target,
            triggerButtonId: e.sourceHandle ?? null,
        }))

        const workflow = { nodes: cleanNodes, edges: cleanEdges }
        const json     = JSON.stringify(workflow, null, 2)
        const blob     = new Blob([json], { type: 'application/json' })
        const url      = URL.createObjectURL(blob)
        const a        = document.createElement('a')
        a.href         = url
        a.download     = `workflow_${Date.now()}.json`
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <aside className="left-sidebar">
            <div className="sidebar-logo">
                <div className="logo-box">
                    <span>RCS</span>
                    <span>orange</span>
                </div>
            </div>

            <div className="sidebar-section-label">Outils</div>

            {tools.map((tool) => (
                <div
                    key={tool.type}
                    className="tool-item"
                    draggable
                    onDragStart={(e) => onDragStart(e, tool.type, tool.label)}
                >
                    <div className="tool-icon">{tool.icon}</div>
                    <span className="tool-label">{tool.label}</span>
                </div>
            ))}

            <div className="sidebar-spacer" />

            <button className="btn-save" onClick={handleSave}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                    <polyline points="17 21 17 13 7 13 7 21"/>
                    <polyline points="7 3 7 8 15 8"/>
                </svg>
                Enregistrer
            </button>
        </aside>
    )
}