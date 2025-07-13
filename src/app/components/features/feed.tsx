'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/navigation'
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react'
import { getProductAssets } from '@/app/lib/api/feed'
import { LoadingScreen } from '../ui/loading-screen'

interface Product {
  associated_id: string
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

export function Feed() {
  const router = useRouter()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProductAssets(12, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const totalLoaded = pages.length * 12
      return lastPage.next ? totalLoaded : undefined
    }
  })

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px'
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const handleProductClick = (product: Product) => {
    router.push(`/p/${product.associated_id}`)
  }

  if (isLoading) return <div><LoadingScreen /></div>
  if (error) return <div className="text-center py-8 text-red-500">Error loading feed</div>

  const allProducts = data?.pages.flatMap(page => page.results) ?? []

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 md:p-0">
      {allProducts.map((product) => (
        <article 
          key={product.associated_id}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Post Header */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={product.original_creator_profile_picture_thumbnail || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + product.original_creator}
              alt={product.original_creator_name}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-sm">
                {product.original_creator_profile_display_name || product.original_creator_name}
              </h3>
              <p className="text-xs text-gray-500">
                {new Date(product.created_at).toLocaleDateString('en-US', {month: 'long', day: 'numeric',})}
              </p>
            </div>
          </div>

          {/* Post Image */}
          <div 
            className="aspect-square cursor-pointer"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.cover_image_thumbnail}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Actions */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="hover:opacity-75 transition-opacity">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="hover:opacity-75 transition-opacity">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="hover:opacity-75 transition-opacity">
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Creator info */}
            <div className="text-sm">
              <span className="font-semibold">
                {product.original_creator_profile_display_name || product.original_creator_name}
              </span>
              <span className="text-gray-500 ml-2">{product.description}</span>
            </div>
          </div>
        </article>
      ))}
      
      {/* Infinite scroll sentinel */}
      <div ref={ref} className="text-center py-4">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  )
}