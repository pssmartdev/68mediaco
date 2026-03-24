const API_BASE = import.meta.env.VITE_API_URL || '/api'

export const fetchProjects = async () => {
    const res = await fetch(`${API_BASE}/projects/`)
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
}

export const fetchProject = async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}/`)
    if (!res.ok) throw new Error('Project not found')
    return res.json()
}

export const submitContact = async (data) => {
    const res = await fetch(`${API_BASE}/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(JSON.stringify(err))
    }
    return res.json()
}
