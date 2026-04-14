import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { GetHomeDate200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

dayjs.locale("pt-br");

interface ConsistencyGridProps extends React.HTMLAttributes<HTMLDivElement> {
  consistencyByDay?: GetHomeDate200ConsistencyByDay;
}

export function ConsistencyGrid({ consistencyByDay = {}, className, ...props }: ConsistencyGridProps) {
  const daysOfWeek = ["S", "T", "Q", "Q", "S", "S", "D"];

  const monday = dayjs().startOf("week").add(1, "day");
  

  const todayStr = dayjs().format("YYYY-MM-DD");

  return (
    <div 
      className={cn(
        "flex flex-1 rounded-2xl border border-zinc-100 bg-white p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]", 
        className
      )}
      {...props}
    >
      <div className="flex w-full justify-between items-center h-full">
        {daysOfWeek.map((label, index) => {
          const dateStr = monday.add(index, "day").format("YYYY-MM-DD");
          const dayData = consistencyByDay?.[dateStr];
          
          const isCompleted = dayData?.workoutDayCompleted;
          const isStarted = dayData?.workoutDayStarted && !isCompleted;
          const isToday = dateStr === todayStr;
          
          let bgClass = "bg-transparent border border-zinc-200";
          
          if (isCompleted) {
            bgClass = "bg-[#3B54FF] border-[#3B54FF]";
          } else if (isStarted) {
            bgClass = "bg-blue-100 border-blue-100";
          } else if (isToday) {
            bgClass = "bg-transparent border-2 border-[#3B54FF]";
          }

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              {/* Quadrado */}
              <div 
                className={cn(
                  "h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] rounded-md transition-all duration-300",
                  bgClass
                )}
              />
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 uppercase leading-none">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}