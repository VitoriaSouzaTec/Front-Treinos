import Link from "next/link";
import { Home, Calendar, Sparkles, BarChart2, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-zinc-100 bg-white px-4 pb-4">
      <Link href="/" className="flex flex-col items-center gap-1 text-[#2B58FF]">
        <Home size={28} strokeWidth={2.5} />
      </Link>
      
      <button className="flex flex-col items-center gap-1 text-zinc-400">
        <Calendar size={28} />
      </button>

      <div className="relative -top-6">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2B58FF] text-white shadow-lg shadow-blue-200">
          <Sparkles size={24} fill="white" />
        </button>
      </div>

      <button className="flex flex-col items-center gap-1 text-zinc-400">
        <BarChart2 size={28} />
      </button>

      <button className="flex flex-col items-center gap-1 text-zinc-400">
        <User size={28} />
      </button>
    </nav>
  );
}
