const API_BASE = 'https://dia-backend.numbersprotocol.io/api/v3'

interface LoginRequest {
    email: string
    password: string
}

interface JWTResponse {
    access: string
    refresh: string
}

interface RefreshResponse {
    access: string
}

export async function loginWithJWT(credentials: LoginRequest): Promise<JWTResponse> {
    const response = await fetch(`${API_BASE}/auth/jwt/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    })

    if (!response.ok) {
        throw new Error('Login Failed')
    }
    
    return response.json()
}

export async function refreshJWT(refreshToken: string) : Promise<RefreshResponse> {
    const response = await fetch(`${API_BASE}/auth/jwt/refresh/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({refresh: refreshToken})
    })

    if (!response.ok) {
        throw new Error('Refresh Token Error')
    }

    return response.json()
}