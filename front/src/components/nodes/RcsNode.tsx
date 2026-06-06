import { Handle, Position } from '@xyflow/react'

const typeConfig: Record<string, { icon: string; color: string }> = {
    text:       { icon: '𝐓',   color: '#FF6B00' },
    textBadge:  { icon: '𝐓✓',  color: '#e05500' },
    media:      { icon: '🖼',   color: '#d44f00' },
    variable:   { icon: '[ ]', color: '#c94a00' },
    quickReply: { icon: '⚡',   color: '#FF6B00' },
    urlAction:  { icon: '🔗',   color: '#e05500' },
    carousel:   { icon: '⊞',   color: '#d44f00' },
    system:     { icon: '⚙',   color: '#c94a00' },
    keyword:    { icon: '🔍',  color: '#FF6B00' },
}

interface RcsNodeData {
    label?: string
    type?: string
    text?: string
    buttons?: { id: string; label: string }[]
    imageUrl?: string
    keyword?: string
    url?: string
}

export default function RcsNode({ data, selected }: { data: RcsNodeData; selected: boolean }) {
    const cfg = typeConfig[data.type || 'text'] || typeConfig.text
    const buttons = data.buttons || []

    return (
        <div className={`rcs-node${selected ? ' selected' : ''}`}>
            {}
            <Handle type="target" position={Position.Top} style={{ background: '#FF6B00', width: 10, height: 10 }} />

            {/* Header */}
            <div className="rcs-node-header" style={{ background: cfg.color }}>
                <span className="rcs-node-header-icon">{cfg.icon}</span>
                <span className="rcs-node-header-title">{data.label || 'Nœud'}</span>
            </div>

            {/* Body */}
            <div className="rcs-node-body">
                {data.type === 'media' && data.imageUrl && (
                    <img
                        src={data.imageUrl}
                        alt="media"
                        style={{ width: '100%', borderRadius: 6, marginBottom: 6, maxHeight: 80, objectFit: 'cover' }}
                    />
                )}

                <div className={`rcs-node-text${data.text ? ' has-content' : ''}`}>
                    {data.text || (data.type === 'keyword' ? data.keyword || 'Mot-clé...' : 'Message...')}
                </div>

                {data.url && (
                    <div style={{ fontSize: 11, color: '#0066cc', marginBottom: 4 }}>🔗 {data.url}</div>
                )}

                {buttons.length > 0 && (
                    <div className="rcs-node-buttons">
                        {buttons.map((btn, i) => (
                            <div key={btn.id} className="rcs-node-btn" style={{ position: 'relative' }}>
                                {btn.label}
                                {}
                                <Handle
                                    type="source"
                                    position={Position.Right}
                                    id={btn.id}
                                    style={{
                                        background: '#FF6B00',
                                        width: 10,
                                        height: 10,
                                        top: '50%',
                                        right: -5,
                                        transform: `translateY(${i * 0}px)`,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {}
            {buttons.length === 0 && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    style={{ background: '#FF6B00', width: 10, height: 10 }}
                />
            )}
        </div>
    )
}