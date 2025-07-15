'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/hooks/use-auth"
import { useEffect, useState } from "react";
import { ProfileHeader } from "../components/features/profile-header";
import { PhotoGrid } from "../components/features/photo-grid";
import { LoadingScreen } from "../components/ui/loading-screen";

export default function ProfilePage() {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter();
    const [activeView, setActiveView] = useState<'grid' | 'posts'>('grid')


    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, isLoading, router])

    if (!isAuthenticated) {
        return null
    }

    if (isLoading) {
        return (
            <div>
                <LoadingScreen />
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                <ProfileHeader activeView={activeView} onViewChange={setActiveView}/>

                <div>
                    {activeView === 'grid' ? (
                        <PhotoGrid />
                    ) :
                        <div>Coming Soon!</div> 
                    }
                </div>
            </div>
        </div>
    )
}