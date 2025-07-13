'use client'

import { useEffect, useState } from "react"
import { refreshJWT } from "../api/auth"

interface AuthTokens {
    access: string
    refresh: string
}

export function useAuth() {
    const [tokens, setTokens] = useState<AuthTokens | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const savedToken = sessionStorage.getItem('auth-token')
        if (savedToken) {
            setTokens(JSON.parse(savedToken))
        }
        setIsLoading(false)
    }, [])

    const login = (tokens: AuthTokens) => {
        setTokens(tokens)
        sessionStorage.setItem('auth-token', JSON.stringify(tokens))
    }

    const logout = () => {
        setTokens(null)
        sessionStorage.removeItem('auth-token')
    }

    const updateTokens = (newTokens: AuthTokens) => {
        setTokens(newTokens)
        sessionStorage.setItem('auth-token', JSON.stringify(newTokens))
    }

    const refreshAccessToken = async (): Promise<string | null> => {
        if (!tokens?.refresh) return null

        try {
            const { access } = await refreshJWT(tokens.refresh)
            const newTokens = { ...tokens, access }
            updateTokens(newTokens)
            console.log('Token refreshed successfully', newTokens)
            return access
        }
        catch (error) {
            console.error('Token Refresh Failed', error)
            logout
            return null
        }
    }

    return {
        tokens,
        isAuthenticated: !!tokens,
        isLoading,
        login,
        logout,
        refreshAccessToken
    }
}