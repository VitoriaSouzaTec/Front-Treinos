import Image from "next/image";
import { redirect } from "next/navigation";
import { authClient } from "@/app/_lib/auth-client";
import { headers } from "next/headers";
import { SignInWithGoogle } from "./_components/sign-in-with-google";

export default async function AuthPage() {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  // If already logged in, go to home
  if (session?.data?.user) {
    redirect("/");
  }

  return (
    <main className="relative flex min-h-screen flex-col md:flex-row bg-black overflow-hidden">
      <div className="relative flex-1 md:flex-none md:w-1/2 flex flex-col justify-start">
        <div className="absolute inset-0 z-0">
          <Image
            src="/login-bg.png"
            alt="Hero background"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-black/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/80 to-transparent md:hidden" />
        </div>

        <div className="relative z-10 flex w-full justify-center pt-20 md:hidden">
          <h1 className="text-4xl font-bold tracking-[0.2em] text-white">
            FIT.AI
          </h1>
        </div>
      </div>

      <div className="relative z-10 flex w-full md:w-1/2 flex-col items-center justify-center bg-primary rounded-t-[40px] md:rounded-none px-8 pt-12 pb-8 md:p-16 shadow-2xl">
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

        <SignInWithGoogle />

        <div className="mt-16 md:mt-24 w-full text-center">
          <p className="text-[10px] uppercase tracking-widest text-white/60">
            © 2026 Copyright FIT.AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </main>
  );
}