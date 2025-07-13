'use client'

import { getUserAssets } from '@/app/lib/api/assets'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface Asset {
  cid: string
}

export function PhotoGrid() {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['user-assets'],
    queryFn: ({ pageParam = 0 }) => getUserAssets(12, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      // If there's a next page, return the page number
      const totalLoaded = pages.length * 12
      return lastPage.next ? totalLoaded : undefined
    }
  })

  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px' // Load when user is 100px from bottom
  })

  // Fetch next page when sentinel comes into view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  const handleImageClick = (asset: Asset) => {
    router.push(`/p/${asset.cid}`)
  }

  if (error) return <div>Error loading photos</div>

  const allAssets = data?.pages.flatMap(page => page.results) ?? []

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {allAssets.map((asset) => (
        <div 
          key={asset.id} 
          className="aspect-square bg-gray-200 cursor-pointer hover:opacity-75 transition-opacity"
          onClick={() => handleImageClick(asset)}
        >
          <img
            src={asset.asset_file_thumbnail}
            alt={asset.headline}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      
      {/* Infinite scroll sentinel */}
      <div ref={ref} className="col-span-3 h-10 flex items-center justify-center">
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </div>
  )
}