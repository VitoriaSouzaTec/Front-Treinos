"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { authClient } from "@/app/_lib/auth-client"
import { Button } from "@/components/ui/button"

export default function AuthPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session, router])

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    })
    
    if (error) {
      console.error("Google login error:", error)
    }
  }

  if (isPending) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <main className="relative flex min-h-screen flex-col bg-black overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/login-bg.png"
          alt="Hero background"
          fill
          className="object-cover object-top opacity-80"
          priority
        />
        {/* Gradient Overlay for logo legibility */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-black/80 to-transparent" />
      </div>

      {/* Header Logo */}
      <div className="relative z-10 flex w-full justify-center pt-20">
        <h1 className="text-4xl font-bold tracking-[0.2em] text-white">
          FIT.AI
        </h1>
      </div>

      {/* Spacer to push content down */}
      <div className="flex-1" />

      {/* Bottom Container */}
      <div className="relative z-10 flex w-full flex-col items-center bg-primary rounded-t-[40px] px-8 pt-12 pb-8 shadow-2xl">
        <div className="mb-12 max-w-[280px]">
          <h2 className="text-center text-3xl font-bold leading-tight text-white">
            O app que vai transformar a forma como você treina.
          </h2>
        </div>

        {/* Google Login Button */}
        <Button
          onClick={handleGoogleLogin}
          className="w-full max-w-sm h-14 rounded-full bg-white text-black hover:bg-white/90 gap-4"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.97l3.69-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335"/>
          </svg>
          <span className="font-semibold">Fazer login com o Google</span>
        </Button>

        {/* Footer */}
        <div className="mt-16 w-full text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/60">
            © 2026 Copyright FIT.AI. Todos os direitos reservados.
          </p>
        </div>
        
        {/* Safe Area Padding */}
        <div className="h-4" />
      </div>
    </main>
  )
}
