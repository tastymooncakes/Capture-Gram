'use client'

import { useAuth } from "@/app/lib/hooks/use-auth"
import React, { useState } from "react"
import { Input } from "../ui/input"
import { loginWithJWT } from "@/app/lib/api/auth"
import { getUserProfile } from "@/app/lib/api/user"

export default function LoginForm() {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const tokens = await loginWithJWT({email, password})
            console.log('✅ Login successful! Tokens:', tokens)
            login(tokens)

            const profile = await getUserProfile()
            console.log('✅ User profile:', profile)
        }
        catch (error) {
            setError("Login Failed. Please check credentials")
        } 
        finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
            <div>
                <Input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <Input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? "Logging In..." : "Login"}
            </button>
        </form>
    )
}
