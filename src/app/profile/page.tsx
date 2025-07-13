'use client'

import { useRouter } from "next/navigation";
import { useAuth } from "../lib/hooks/use-auth"
import { useEffect } from "react";
import { ProfileHeader } from "../components/features/profile-header";
import { PhotoGrid } from "../components/features/photo-grid";
import { LoadingScreen } from "../components/ui/loading-screen";

export default function ProfilePage() {
    const { isAuthenticated, isLoading } = useAuth()
    const router = useRouter();

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
                <ProfileHeader />

                <div className="mt-8">
                    <PhotoGrid />
                </div>
            </div>
        </div>
    )
}