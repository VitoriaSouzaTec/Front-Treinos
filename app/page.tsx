"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/app/_lib/auth-client";
import { Navbar } from "@/components/navbar";
import { ConsistencyGrid } from "@/components/consistency-grid";
import { WorkoutCard } from "@/components/workout-card";

import { GetHomeDate200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated"; 

export default function Home() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/auth");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Carregando...
      </div>
    );
  }

  const firstName = session?.user?.name?.split(" ")[0] || "";
 

  return (
    <div className="flex min-h-screen w-full justify-center bg-zinc-950">
      <div className="relative flex min-h-screen w-full max-w-md flex-col bg-white font-sans shadow-2xl pb-24 overflow-x-hidden">
        
        {/* Hero Section */}
        <div className="relative h-72 w-full overflow-hidden rounded-b-[2rem]">
          <Image
            src="/login-bg.png" 
            alt="Hero background"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
          <div className="absolute top-6 left-6">
            <span className="text-white font-black tracking-tighter text-xl">FIT.AI</span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-white tracking-tight leading-none mb-1 capitalize">
                Olá, {firstName}
              </h1>
              <p className="text-sm text-zinc-300 font-medium">Bora treinar hoje?</p>
            </div>
            <button className="rounded-full bg-[#3B54FF] hover:bg-blue-700 transition px-6 py-2.5 text-sm font-bold text-white shadow-lg">
              Bora!
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex flex-col px-6 pt-8 gap-8">
          
          {/* Consistência */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-zinc-900 tracking-tight">Consistência</h2>
              <button className="text-xs font-semibold text-[#3B54FF] hover:underline">Ver histórico</button>
            </div>
            <div className="flex items-stretch gap-3 w-full">
              <ConsistencyGrid />
              {/* Streak */}
              <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#FFF5EE] px-4 py-4 min-w-[80px]">
                <span className="text-2xl">🔥</span>
                <span className="text-xl font-bold text-zinc-900">15</span>
              </div>
            </div>
          </section>

          {/* Treino de Hoje */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-zinc-900 tracking-tight">Treino de Hoje</h2>
              <button className="text-xs font-semibold text-[#3B54FF] hover:underline">Ver treinos</button>
            </div>
            
            <WorkoutCard workout={null}/>
          </section>

        </main>

        <Navbar />
      </div>
    </div>
  );
}