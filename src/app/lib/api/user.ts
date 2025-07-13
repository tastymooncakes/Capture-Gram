import { apiClient } from "./client"

const API_BASE = 'https://dia-backend.numbersprotocol.io/api/v3'

interface UserProfile {
    username: string
    email: string
    follower_count: number
    following_count: number
    asset_count: number
    profile: {
        profile_background: string
        profile_picture: string
        profile_picture_thumbnail: string
        description: string
        display_name: string
    }
}

export async function getUserProfile(): Promise<UserProfile> {
    return apiClient.request('/auth/users/me/')
}