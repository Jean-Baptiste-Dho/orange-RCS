import { useEffect, useState } from 'react'
import type { Node } from '@xyflow/react'

interface NodeData {
    label?: string
    type?: string
    text?: string
    buttons?: { id: string; label: string }[]
    imageUrl?: string
    keyword?: string
    url?: string
}

interface RightSidebarProps {
    selectedNode: Node | null
}

export default function RightSidebar({ selectedNode }: RightSidebarProps) {
    const [data, setData] = useState<NodeData>({})

    useEffect(() => {
        if (selectedNode) setData(selectedNode.data as NodeData)
    }, [selectedNode])

    const update = (fields: Partial<NodeData>) => {
        const newData = { ...data, ...fields }
        setData(newData)
        const fn = (window as unknown as Record<string, unknown>).__updateNodeData as
            | ((id: string, d: Record<string, unknown>) => void)
            | undefined
        if (fn && selectedNode) fn(selectedNode.id, newData)
    }

    const addButton = () => {
        const buttons = [...(data.buttons || []), { id: `btn_${Date.now()}`, label: 'Bouton' }]
        update({ buttons })
    }

    const updateButton = (id: string, label: string) => {
        const buttons = (data.buttons || []).map((b) => (b.id === id ? { ...b, label } : b))
        update({ buttons })
    }

    const removeButton = (id: string) => {
        const buttons = (data.buttons || []).filter((b) => b.id !== id)
        update({ buttons })
    }

    const deleteNode = () => {
        const fn = (window as unknown as Record<string, unknown>).__deleteNode as
            | ((id: string) => void)
            | undefined
        if (fn && selectedNode) fn(selectedNode.id)
    }

    if (!selectedNode) {
        return (
            <aside className="right-sidebar">
                <div className="right-sidebar-header">Saisie &amp; Configuration</div>
                <div className="right-sidebar-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <path d="M9 12h6M12 9v6" />
                    </svg>
                    <span>Sélectionnez un nœud<br />pour le configurer</span>
                </div>
            </aside>
        )
    }

    const nodeType = data.type || 'text'

    return (
        <aside className="right-sidebar">
            <div className="right-sidebar-header">Saisie &amp; Configuration</div>
            <div className="right-sidebar-content">

                <div className="config-field">
                    <span className="config-node-type">{data.label || 'Nœud'}</span>
                </div>

                {['text', 'textBadge', 'quickReply', 'system'].includes(nodeType) && (
                    <div className="config-field">
                        <label className="config-label">Texte du message</label>
                        <textarea
                            className="config-textarea"
                            value={data.text || ''}
                            placeholder="Saisissez votre message..."
                            onChange={(e) => update({ text: e.target.value })}
                        />
                    </div>
                )}

                {nodeType === 'media' && (
                    <>
                        <div className="config-field">
                            <label className="config-label">URL de l'image</label>
                            <input className="config-input" value={data.imageUrl || ''} placeholder="https://..." onChange={(e) => update({ imageUrl: e.target.value })} />
                        </div>
                        <div className="config-field">
                            <label className="config-label">Texte alternatif</label>
                            <input className="config-input" value={data.text || ''} placeholder="Description de l'image" onChange={(e) => update({ text: e.target.value })} />
                        </div>
                    </>
                )}

                {nodeType === 'variable' && (
                    <div className="config-field">
                        <label className="config-label">Nom de la variable</label>
                        <input className="config-input" value={data.text || ''} placeholder="ex: {{prenom}}" onChange={(e) => update({ text: e.target.value })} />
                    </div>
                )}

                {nodeType === 'urlAction' && (
                    <>
                        <div className="config-field">
                            <label className="config-label">Texte du bouton</label>
                            <input className="config-input" value={data.text || ''} placeholder="Voir plus" onChange={(e) => update({ text: e.target.value })} />
                        </div>
                        <div className="config-field">
                            <label className="config-label">URL de destination</label>
                            <input className="config-input" value={data.url || ''} placeholder="https://..." onChange={(e) => update({ url: e.target.value })} />
                        </div>
                    </>
                )}

                {nodeType === 'carousel' && (
                    <div className="config-field">
                        <label className="config-label">Titre du carrousel</label>
                        <input className="config-input" value={data.text || ''} placeholder="Découvrez nos offres" onChange={(e) => update({ text: e.target.value })} />
                    </div>
                )}

                {nodeType === 'keyword' && (
                    <div className="config-field">
                        <label className="config-label">Mot-clé déclencheur</label>
                        <input className="config-input" value={data.keyword || ''} placeholder="ex: STOP, OUI, INFO..." onChange={(e) => update({ keyword: e.target.value })} />
                    </div>
                )}

                {['text', 'textBadge', 'quickReply', 'carousel'].includes(nodeType) && (
                    <div className="config-field">
                        <label className="config-label">Boutons de réponse</label>
                        <div className="buttons-list">
                            {(data.buttons || []).map((btn) => (
                                <div key={btn.id} className="button-row">
                                    <input value={btn.label} onChange={(e) => updateButton(btn.id, e.target.value)} placeholder="Label du bouton" />
                                    <button className="btn-remove" onClick={() => removeButton(btn.id)}>×</button>
                                </div>
                            ))}
                        </div>
                        <button className="btn-add-button" onClick={addButton}>+ Ajouter un bouton</button>
                    </div>
                )}

            </div>

            {/* Delete button */}
            <div className="right-sidebar-footer">
                <button className="btn-delete-node" onClick={deleteNode}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                        <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                    </svg>
                    Supprimer ce nœud
                </button>
            </div>
        </aside>
    )
}