import { apiClient } from "./client";

interface Asset {
    id: string
    cid: string
    caption: string
    headline: string
    asset_file: string
    asset_file_thumbnail: string
    uploaded_at: string
    creator_profile_picture_thumbnail: string
    creator_name: string
}

interface AssetsResponse {
    count: number
    next: string | null
    previous: string | null
    results: Asset[]
}

export async function getUserAssets(limit: number = 12, offset: number = 0): Promise<AssetsResponse>{
    return apiClient.request(`/assets/?limit=${limit}&offset=${offset}&is_original_owner=true`)
}

export async function getAssetId(cid: string): Promise<Asset>{
    return apiClient.request(`/assets/${cid}`)
}


