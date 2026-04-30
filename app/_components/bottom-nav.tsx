import Link from "next/link";
import {
  House,
  Calendar,
  Sparkles,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";
import dayjs from "dayjs";
import { getHomeDate } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";


interface BottomNavProps {
  activePage?: "home" | "calendar"| "stats" | "profile";
}

export async function BottomNav({ activePage = "home" }: BottomNavProps) {
  const today = dayjs();
  const homeData = await getHomeDate(today.format("YYYY-MM-DD"));

  const calendarHref =
    homeData.status === 200 && homeData.data.todayWorkoutDay
      ? `/workout-plans/${homeData.data.todayWorkoutDay.workoutPlanId}/days/${homeData.data.todayWorkoutDay.id}`
      : undefined;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around rounded-t-[20px] border border-border bg-background px-6 py-4">
      <Link href="/" className="p-3">
        <House
          className={cn(
            "size-6",
            activePage === "home" ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </Link>
      <Link href="/stats" className="p-3">
        <ChartNoAxesColumn
          className={cn(
            "size-6",
            activePage === "stats"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        />
      </Link>
      
      <Link href="/ai" className="relative -top-8 rounded-full bg-primary p-4 shadow-lg shadow-primary/40 active:scale-95 transition-transform">
        <Sparkles className="size-6 text-primary-foreground" />
      </Link>

      {calendarHref ? (
        <Link href={calendarHref} className="p-3">
          <Calendar
            className={cn(
              "size-6",
              activePage === "calendar"
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          />
        </Link>
      ) : (
        <button className="p-3 opacity-30 cursor-not-allowed">
          <Calendar className="size-6 text-muted-foreground" />
        </button>
      )}

      <Link href="/profile" className="p-3">
        <UserRound
          className={cn(
            "size-6",
            activePage === "profile"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        />
      </Link>
    </nav>
  );
}
