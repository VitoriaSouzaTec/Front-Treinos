import Link from "next/link";
import { Clock, Dumbbell, CalendarIcon } from "lucide-react";
import { GetHomeDate200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

interface WorkoutCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  workout: GetHomeDate200TodayWorkoutDay;
}

export function WorkoutCard({ workout, className, ...props }: WorkoutCardProps) {
  if (!workout) return null;

  const { name, estimatedDurationInSeconds, exercisesCount, coverImageUrl, weekDay } = workout;
  const duration = Math.floor(estimatedDurationInSeconds / 60);

  // Mapeamento dos dias da semana para Português
  const weekDayMap: Record<string, string> = {
    MONDAY: "SEGUNDA",
    TUESDAY: "TERÇA",
    WEDNESDAY: "QUARTA",
    THURSDAY: "QUINTA",
    FRIDAY: "SEXTA",
    SATURDAY: "SÁBADO",
    SUNDAY: "DOMINGO",
  };

  const dayLabel = weekDayMap[weekDay] || weekDay;

  return (
    <Link 
      href="#" 
      className={cn(
        "relative group block w-full overflow-hidden rounded-3xl aspect-[16/9] shadow-md border border-zinc-100",
        className
      )}
      {...props}
    >
      {/* Gradiente de proteção para garantir a leitura do texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 z-10" />
      
      {coverImageUrl ? (
        <img 
          src={coverImageUrl} 
          alt={name} 
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-800 transition-transform duration-500 group-hover:scale-105" />
      )}

      {/* Conteúdo do Card */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-5 sm:p-6">
        
        {/* Badge do Dia */}
        <div className="flex">
          <span className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1.5 text-[10px] font-bold tracking-wider text-white">
            <CalendarIcon size={12} />
            {dayLabel}
          </span>
        </div>

        {/* Informações do Treino */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold text-white drop-shadow-sm leading-tight">
            {name}
          </h3>
          
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-300">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span>{duration} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Dumbbell size={16} />
              <span>{exercisesCount} exercícios</span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}