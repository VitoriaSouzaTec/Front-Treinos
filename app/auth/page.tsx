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
      callbackURL: "http://localhost:3000",
    })
    
    if (error) {
      console.error("Google login error:", error)
    }
  }

  if (isPending) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
  }

  return (
    <main className="relative flex min-h-screen flex-col md:flex-row bg-black overflow-hidden">
      
      {/* SEÇÃO DA IMAGEM 
     
      */}
      <div className="relative flex-1 md:flex-none md:w-1/2 flex flex-col justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-bg.png"
            alt="Hero background"
            fill
            // Troquei "object-top" por "object-center" para centralizar o cara.
            // DICA: Se ainda não ficar perfeito, use posições exatas como "object-[50%_30%]" (Eixo X _ Eixo Y)
            className="object-cover object-center opacity-80" 
            priority
          />
          {/* Gradiente do topo (para destacar o logo no mobile) */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/90 to-transparent" />
          
          {/* Gradiente inferior (apenas mobile, para suavizar a entrada do painel) */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/80 to-transparent md:hidden" />
        </div>

        {/* Logo Mobile (Fica em cima da imagem) */}
        <div className="relative z-10 flex w-full justify-center pt-20 md:hidden">
          <h1 className="text-4xl font-bold tracking-[0.2em] text-white">
            FIT.AI
          </h1>
        </div>
      </div>

      {/* SEÇÃO DE LOGIN (PAINEL)
        Mobile: Fica na parte inferior com bordas arredondadas
        Desktop: Fica na direita, centralizado, tela cheia, sem bordas arredondadas 
      */}
      <div className="relative z-10 flex w-full md:w-1/2 flex-col items-center justify-center bg-primary rounded-t-[40px] md:rounded-none px-8 pt-12 pb-8 md:p-16 shadow-2xl">
        
        {/* Logo Desktop (Fica dentro do painel escuro) */}
        <div className="hidden md:flex w-full justify-center mb-12">
          <h1 className="text-5xl font-bold tracking-[0.2em] text-white">
            FIT.AI
          </h1>
        </div>

        <div className="mb-12 max-w-[280px] md:max-w-[400px]">
          <h2 className="text-center text-3xl md:text-4xl font-bold leading-tight text-white">
            O app que vai transformar a forma como você treina.
          </h2>
        </div>

        <Button
          onClick={handleGoogleLogin}
          className="w-full max-w-sm h-14 rounded-full bg-white text-black hover:bg-white/90 gap-4 shadow-lg hover:shadow-xl transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.97l3.69-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335" />
          </svg>
          <span className="font-semibold">Fazer login com o Google</span>
        </Button>

        {/* Footer */}
        <div className="mt-16 md:mt-24 w-full text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/60">
            © 2026 Copyright FIT.AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
      
    </main>
  )
}