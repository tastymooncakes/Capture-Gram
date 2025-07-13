'use client'

import { getUserProfile } from "@/app/lib/api/user"
import { useQuery } from "@tanstack/react-query"
import { Settings, Camera } from 'lucide-react'
import { LoadingScreen } from "../ui/loading-screen"


export function ProfileHeader() {
    const { data: profile} = useQuery({
        queryKey: ['user-profile'],
        queryFn: getUserProfile
    })

    if (!profile) return null

    return (
            <div>
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                {/* Profile Info Section */}
                <div className="flex gap-4 md:gap-8 items-start">
                    {/* Profile Picture */}
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200 border flex-shrink-0">
                        {profile.profile.profile_picture ? (
                            <img 
                                src={profile.profile.profile_picture} 
                                alt={profile.username}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                <Camera className="w-4 h-4 md:w-8 md:h-8 text-white" />
                            </div>
                        )}
                    </div>

                    {/* Profile Details */}
                    <div className="flex-1 min-w-0">
                        {/* Username and Actions */}
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3 md:mb-6">
                            <h1 className="text-xl font-light">{profile.username}</h1>
                            
                            <div className="flex gap-2">
                                <button className="flex-1 md:flex-none px-3 md:px-4 py-1.5 bg-[#3A3B3C] hover:bg-[#20272B] rounded text-xs md:text-sm font-medium">
                                    Edit profile
                                </button>
                                <button className="flex-1 md:flex-none px-3 md:px-4 py-1.5 bg-[#3A3B3C] hover:bg-[#20272B] rounded text-xs md:text-sm font-medium">
                                    View archive
                                </button>
                                <button className="hidden md:block p-1.5 rounded">
                                    <Settings className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Stats - Desktop only in this section */}
                        <div className="hidden md:flex gap-8 mb-6">
                            <span className="text-sm">
                                <strong>{profile.asset_count}</strong> posts
                            </span>
                            <span className="text-sm">
                                <strong>{profile.follower_count}</strong> followers
                            </span>
                            <span className="text-sm">
                                <strong>{profile.following_count}</strong> following
                            </span>
                        </div>

                        {/* Bio - Desktop only in this section */}
                        <div className="hidden md:block text-sm">
                            {profile.profile.display_name && (
                                <div className="font-bold mb-1">{profile.profile.display_name}</div>
                            )}
                            {profile.profile.description && (
                                <div className="whitespace-pre-line">
                                    {profile.profile.description}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile-only sections */}
                <div className="md:hidden mt-4 space-y-4">
                    {/* Mobile Bio */}
                    <div className="text-sm">
                        {profile.username && (
                            <div className="font-bold mb-1">{profile.username}</div>
                        )}
                        {profile.profile.description && (
                            <div className="whitespace-pre-line">
                                {profile.profile.description}
                            </div>
                        )}
                    </div>

                    {/* Mobile Stats */}
                    <div className="flex justify-around text-center border-t border-t-white/15 pt-4">
                        <div>
                            <div className="font-semibold text-sm">{profile.asset_count}</div>
                            <div className="text-xs text-gray-500">posts</div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm">{profile.follower_count}</div>
                            <div className="text-xs text-gray-500">followers</div>
                        </div>
                        <div>
                            <div className="font-semibold text-sm">{profile.following_count}</div>
                            <div className="text-xs text-gray-500">following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}