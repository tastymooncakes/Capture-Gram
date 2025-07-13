'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, User } from 'lucide-react'
import { cn } from '@/app/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/app/lib/api/user'

const navItems = [
  { href: '/feed', icon: Home, label: 'Home' },
  { href: '/explore', icon: Search, label: 'Explore' },
]

export function Navigation() {
  const pathname = usePathname()

  const { data: profile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-700 flex-col p-4 z-40">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/feed" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CaptureGram
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-left w-full',
                  isActive 
                    ? 'bg-gray-700 font-semibold' 
                    : 'hover:bg-gray-700'
                )}
              >
                <Icon 
                  size={24} 
                  className={cn(
                    isActive ? 'text-white' : 'text-gray-500'
                  )}
                />
                <span className="text-base">{item.label}</span>
              </Link>
            )
          })}
          <Link
            href="/profile"
            className={cn(
              'flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-left w-full',
              pathname === '/profile' 
                ? 'bg-gray-700 font-semibold' 
                : 'hover:bg-gray-700'
            )}
          >
            {profile?.profile.profile_picture ? (
              <img
                src={profile.profile.profile_picture}
                alt="Profile"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <User 
                size={24} 
                className={cn(
                  pathname === '/profile' ? 'text-black' : 'text-gray-500'
                )}
              />
            )}
            <span className="text-base">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
                  isActive ? 'text-white' : 'text-gray-500'
                )}
              >
                <Icon size={24} />
              </Link>
            )
          })}
          <Link
            href="/profile"
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-2 transition-colors',
              pathname === '/profile' ? 'text-black' : 'text-gray-500'
            )}
          >
            {profile?.profile.profile_picture ? (
              <img
                src={profile.profile.profile_picture}
                alt="Profile"
                className={cn("w-6 h-6 rounded-full object-cover transition-all", 
                    pathname === '/profile' 
                    ? 'border-2 border-white ring-2 ring-black' : '')}
              />
            ) : (
              <User size={24} />
            )}
          </Link>
        </div>
      </nav>
    </>
  )
}