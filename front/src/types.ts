export interface Workflow {
    id: string
    name: string
    category: string
    lastModified: string
    modifiedBy: string
    status: 'Publié' | 'Brouillon'
}