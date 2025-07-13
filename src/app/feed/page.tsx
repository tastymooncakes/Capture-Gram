'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../lib/hooks/use-auth'
import { Feed } from '../components/features/feed'

export default function FeedPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      <div className="py-8">
        <Feed />
      </div>
    </div>
  )
}