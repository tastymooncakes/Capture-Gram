'use client'

import { useRouter } from "next/navigation";
import LoginForm from "./components/forms/login-form";
import { useAuth } from "./lib/hooks/use-auth";
import { useEffect } from "react";
import { LoadingScreen } from "./components/ui/loading-screen";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/feed')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) return <div><LoadingScreen /></div>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <LoginForm />
      </div>
    </div>
  );
}
