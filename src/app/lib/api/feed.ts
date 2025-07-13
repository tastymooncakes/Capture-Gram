import { apiClient } from "./client";

interface Product {
    associated_id: string
    description: string
    cover_image: string
    cover_image_thumbnail: string
    original_creator: string
    original_creator_name: string
    original_creator_profile_display_name: string
    original_creator_profile_picture: string
    original_creator_profile_picture_thumbnail: string
    created_at: string
    enabled: boolean
}

interface ProductResponse {
    count: number
    next: string | null
    previous: string | null
    results: Product[]
}

export async function getProductAssets(limit: number = 12, offset: number = 0): Promise<ProductResponse> {
    return apiClient.publicRequest(`/store/products`)
}