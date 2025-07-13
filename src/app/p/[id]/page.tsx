'use client'

import { getAssetId } from "@/app/lib/api/assets"
import { useAuth } from "@/app/lib/hooks/use-auth"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { X, ArrowLeft, Heart, MessageCircle, Send } from 'lucide-react'

export default function PhotoPage() {
    const params = useParams()
    const router = useRouter()

    const { isAuthenticated, isLoading: authLoading } = useAuth()
    const cid = params.id as string

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, authLoading, router])

    const { data: asset, isLoading, error } = useQuery({
        queryKey: ['asset', cid],
        queryFn: () => getAssetId(cid),
        enabled: !!cid && isAuthenticated
    })

    const handleClose = () => {
        router.back()
    }

    const handleShare = async (cid: string | undefined) => {
        if (!cid) return

        const ipfsUrl = `https://ipfs-pin.numbersprotocol.io/ipfs/${cid}`

        try {
            await navigator.clipboard.writeText(ipfsUrl)
        }
        catch (error) {
            alert(`IPFS URL ${ipfsUrl}`)
        }
    }

    return (
        <>
            {/* Desktop: Modal overlay */}
            <div className="hidden md:block fixed inset-0 bg-black bg-opacity-75 z-50">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="relative max-w-4xl w-full min-h-[70vh] max-h-[80vh] bg-white rounded-lg overflow-hidden flex">
                        
                        {/* Close button */}
                        <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                        >
                        <X className="w-5 h-5" />
                        </button>

                        {/* Image section */}
                        <div className="w-1/2 bg-black flex items-center justify-center">
                        <img
                            src={asset?.asset_file}
                            alt={asset?.headline || asset?.caption}
                            className="w-full h-full object-contain"
                        />
                        </div>

                        {/* Details section */}
                        <div className="w-1/2 bg-[#000000cc] p-6 flex flex-col">
                        <div className="flex items-center gap-3 pb-4">
                            {asset?.creator_profile_picture_thumbnail ? (
                                <img 
                                    src={asset?.creator_profile_picture_thumbnail}
                                    alt={asset?.creator_name}
                                    className="w-8 h-8 rounded-full"
                                />
                            ): <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />}
                            <span className="font-bold text-sm">{asset?.creator_name}</span>
                        </div>

                        <div className="flex-1 py-4">
                            {asset?.headline && (
                            <div className="text-sm font-bold mb-2 break-all">{asset?.headline}</div>
                            )}
                            {asset?.caption && (
                            <div className="text-sm break-all">{asset?.caption}</div>
                            )}
                        </div>

                        {/** Social Interactions */}
                        <div className="flex items-center gap-4">
                            <button>
                                <Heart className="w-6 h-6" />
                            </button>
                            <button>
                                <MessageCircle className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => handleShare(asset?.cid)}
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="pt-4 text-xs text-gray-500">
                            <div>{asset?.uploaded_at ? new Date(asset.uploaded_at).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                            }) : ''}</div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile: Full page */}
            <div className="md:hidden min-h-screen bg-[#000000cc] pb-50 flex flex-col">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-4 text-white">
                <button onClick={handleClose}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <span className="font-bold">Post</span>
                <div className="w-6" /> {/* Spacer */}
                </div>

                <div className="flex items-center justify-between pl-4 pb-4 text-white">
                    <div className="flex items-center gap-3">
                            {asset?.creator_profile_picture_thumbnail ? (
                                <img 
                                    src={asset?.creator_profile_picture_thumbnail}
                                    alt={asset?.creator_name}
                                    className="w-8 h-8 rounded-full"
                                />
                            ): <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />}
                            <span className="font-bold text-sm">{asset?.creator_name}</span>
                        </div>
                </div>

                {/* Mobile image */}
                <div className="flex items-center justify-center flex-1">
                <img
                    src={asset?.asset_file}
                    alt={asset?.headline || asset?.caption}
                    className="max-w-full max-h-full object-contain"
                />
                </div>

                {/** Social Interactions */}
                <div className="flex items-center gap-4 px-4 pt-4">
                    <button>
                        <Heart className="w-6 h-6" />
                    </button>
                    <button>
                        <MessageCircle className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => handleShare(asset?.cid)}
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>

                {/* Mobile details */}
                {(asset?.headline || asset?.caption) && (
                <div className="bg-black bg-opacity-50 text-white p-4">
                    {asset?.headline && <div className="font-medium mb-1 break-all">{asset?.headline}</div>}
                    {asset?.caption && <div className="text-sm break-all">{asset?.caption}</div>}

                <div className="pt-4 text-xs text-gray-500">
                    <div>{asset?.uploaded_at ? new Date(asset.uploaded_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                    }) : ''}</div>
                </div>
                </div>
                )}
            </div>
        </>
    )
}