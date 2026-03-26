import { GardenGridProps } from "@/interfaces";

export function GardenGrid({
  flowers,
  dayFlowerMap,
  onFlowerClick,
}: GardenGridProps) {
  const days = Array.from({ length: 365 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {days.map((day) => {
        const flowerId = dayFlowerMap[day];
        const flower = flowerId ? flowers.find((f) => f.id === flowerId) : null;
        const isUnlocked = !!flower;

        return (
          <div
            key={day}
            onClick={() => isUnlocked && flower && onFlowerClick(flower)}
            className={`
              aspect-square rounded-2xl p-3 flex flex-col items-center justify-center
              transition-all duration-300 transform
              ${
                isUnlocked
                  ? "bg-white/80 cursor-pointer hover:scale-105 hover:shadow-xl"
                  : "bg-gray-200/40 cursor-default"
              }
            `}
          >
            {isUnlocked && flower ? (
              <>
                <div className="text-4xl mb-1 animate-float">
                  {flower.imagen}
                </div>
                <p className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {flower.nombre}
                </p>
                <p className="text-xs text-pink-500 font-semibold mt-1">
                  Día {day}
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-1 opacity-20 grayscale">🌸</div>
                <p className="text-xs text-gray-400 text-center font-medium">
                  Día {day}
                </p>
                <div className="mt-1 w-6 h-6 rounded-full bg-gray-300/50 flex items-center justify-center">
                  <span className="text-xs text-gray-400">🔒</span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
