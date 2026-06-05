import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockWorkflows } from '../mockData'
import type { Workflow } from '../types'
import './WorkflowList.css'

const CATEGORIES = ['Toutes', 'Upsell', 'Transactionnel', 'Relation client', 'Marketing']
const STATUSES   = ['Tous', 'Publié', 'Brouillon']
const PER_PAGE   = 8

const tools = [
    'Zone de texte simple',
    'Zone de texte certifiée',
    "Zone d'image / Média",
    'Champ variable',
    'Bouton de réponse rapide',
    "Bouton d'action URL",
    'Carte de carrousel',
    "Bouton d'action système",
    'Déclencheur par mot-clé',
    'Retour en arrière',
]

export default function WorkflowList() {
    const navigate = useNavigate()
    const [workflows, setWorkflows] = useState<Workflow[]>(mockWorkflows)
    const [search, setSearch]       = useState('')
    const [status, setStatus]       = useState('Tous')
    const [category, setCategory]   = useState('Toutes')
    const [page, setPage]           = useState(1)

    const filtered = workflows.filter((w) => {
        const matchSearch   = w.name.toLowerCase().includes(search.toLowerCase())
        const matchStatus   = status === 'Tous' || w.status === status
        const matchCategory = category === 'Toutes' || w.category === category
        return matchSearch && matchStatus && matchCategory
    })

    const totalPages = Math.ceil(filtered.length / PER_PAGE)
    const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

    const resetFilters = () => {
        setSearch('')
        setStatus('Tous')
        setCategory('Toutes')
        setPage(1)
    }

    const togglePublish = (id: string) => {
        setWorkflows((ws) =>
            ws.map((w) =>
                w.id === id ? { ...w, status: w.status === 'Publié' ? 'Brouillon' : 'Publié' } : w
            )
        )
    }

    const deleteWorkflow = (id: string) => {
        setWorkflows((ws) => ws.filter((w) => w.id !== id))
    }

    return (
        <div className="wl-layout">
            {/* Left sidebar */}
            <aside className="wl-sidebar">
                <div className="wl-logo">
                    <div className="logo-box">
                        <span>RCS</span>
                        <span>orange</span>
                    </div>
                </div>
                <div className="wl-tools">
                    {tools.map((t) => (
                        <div key={t} className="wl-tool-item">
                            <div className="wl-tool-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="7" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/>
                                    <rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 13v3a1 1 0 001 1h3M19 13v3a1 1 0 01-1 1h-3M12 7V4"/>
                                </svg>
                            </div>
                            <span>{t}</span>
                        </div>
                    ))}
                </div>
                <div className="wl-version">Version 1.0.0</div>
            </aside>

            {/* Main content */}
            <main className="wl-main">
                {/* Header */}
                <header className="wl-header">
                    <div className="wl-header-left">
                        <div className="wl-header-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="2" y="7" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/>
                                <rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 13v3a1 1 0 001 1h3M19 13v3a1 1 0 01-1 1h-3M12 7V4"/>
                            </svg>
                        </div>
                        <span>Orange RCS / Workflow Builder</span>
                    </div>
                </header>

                <div className="wl-content">
                    {/* Title row */}
                    <div className="wl-title-row">
                        <h1>Liste des workflows</h1>
                        <button className="btn-new" onClick={() => navigate('/editor/new')}>
                            <span>⊕</span> Nouveau workflow
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="wl-filters">
                        <div className="wl-search">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                            </svg>
                            <input
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                                placeholder="Rechercher un workflow"
                            />
                        </div>

                        <div className="wl-filter-group">
                            <label>Statut</label>
                            <div className="wl-select-wrapper">
                                <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1) }}>
                                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="wl-filter-group">
                            <label>Catégorie</label>
                            <div className="wl-select-wrapper">
                                <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }}>
                                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <button className="btn-reset" onClick={resetFilters}>Réinitialiser les filtres</button>
                    </div>

                    {/* Table */}
                    <div className="wl-table-card">
                        <table className="wl-table">
                            <thead>
                            <tr>
                                <th>Nom du workflow</th>
                                <th>Catégorie</th>
                                <th>Dernière modification</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginated.map((w) => (
                                <tr key={w.id} className="wl-row" onClick={() => navigate(`/editor/${w.id}`)}>
                                    <td>
                                        <div className="wl-name-cell">
                                            <div className="wl-row-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="2" y="7" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/>
                                                    <rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 13v3a1 1 0 001 1h3M19 13v3a1 1 0 01-1 1h-3M12 7V4"/>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="wl-name">{w.name}</div>
                                                <div className="wl-id">ID : {w.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="wl-category">{w.category}</td>
                                    <td className="wl-date">
                                        <div>{w.lastModified}</div>
                                        <div className="wl-by">Par {w.modifiedBy}</div>
                                    </td>
                                    <td>
                      <span className={`wl-badge ${w.status === 'Publié' ? 'published' : 'draft'}`}>
                        <span className="badge-dot" />
                          {w.status}
                      </span>
                                    </td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <div className="wl-actions">
                                            <button
                                                className={`btn-publish ${w.status === 'Publié' ? 'published' : 'draft'}`}
                                                onClick={() => togglePublish(w.id)}
                                            >
                                                Publier
                                            </button>
                                            <button className="btn-delete" onClick={() => deleteWorkflow(w.id)}>
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="wl-pagination">
                            <span>Affichage de {(page - 1) * PER_PAGE + 1} à {Math.min(page * PER_PAGE, filtered.length)} de {filtered.length} workflows</span>
                            <div className="wl-pages">
                                <button className="page-arrow" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button key={p} className={`page-btn ${p === page ? 'active' : ''}`} onClick={() => setPage(p)}>
                                        {p}
                                    </button>
                                ))}
                                <button className="page-arrow" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}