import { refreshJWT } from "./auth"

interface ApiOptions {
    method?: string
    headers?: Record<string, string>
    body?: string
}

class ApiClient {
    private baseUrl = 'https://dia-backend.numbersprotocol.io/api/v3'
    private getTokens = () => {
        const saved = sessionStorage.getItem('auth-token')
        return saved ? JSON.parse(saved) : null
    }
    
    private updateTokens = (tokens : {access: string; refresh: string }) => {
        sessionStorage.setItem('auth-token', JSON.stringify(tokens))
    }

    async request(endpoint: string, options: ApiOptions = {}) : Promise<any> {
        const tokens = this.getTokens()

        if (!tokens) throw new Error('No auth tokens')
        
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${tokens.access}`,
                ...options.headers,
            },
            ...(options.body && { body: options.body })
        }

        let response = await fetch(`${this.baseUrl}${endpoint}`, config)

        if (response.status === 401) {
            try {
                const { access } = await refreshJWT(tokens.refresh)
                const newTokens = {...tokens, access}
                this.updateTokens(newTokens)

                config.headers.Authorization = `Bearer ${access}`
                response = await fetch(`${this.baseUrl}${endpoint}`, config)
            }
            catch (error) {
                sessionStorage.removeItem('auth-token')
                throw new Error('Session expired. Please login again.')
            }
        }

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }

        return response.json()
    }

    async publicRequest(endpoint: string, options: ApiOptions = {}): Promise<any> {
        const config = {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...(options.body && { body: options.body })
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, config)

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
        }
        return response.json()
    }
}

export const apiClient = new ApiClient()