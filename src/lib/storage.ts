import { DayFlowerMap, Milestone } from "@/interfaces";

const STORAGE_KEY_DAY_FLOWERS = "alejardin-day-flowers";
const STORAGE_KEY_LAST_DATE = "alejardin-last-date";
const STORAGE_KEY_MILESTONES = "alejardin-milestones";

export const MILESTONES: Omit<Milestone, "unlocked">[] = [
  {
    id: 1,
    flowers: 7,
    title: "Primera Semana",
    emoji: "🌟",
    description: "¡Has completado tu primera semana de flores!",
  },
  {
    id: 2,
    flowers: 30,
    title: "Un Mes Completo",
    emoji: "🌺",
    description: "¡Ya llevas un mes descubriendo flores!",
  },
  {
    id: 3,
    flowers: 50,
    title: "Medio Centenar",
    emoji: "🎉",
    description: "¡50 flores descubiertas! Vas muy bien.",
  },
  {
    id: 4,
    flowers: 100,
    title: "Centenario Floral",
    emoji: "🎊",
    description: "¡100 flores! Tu jardín está floreciendo.",
  },
  {
    id: 5,
    flowers: 150,
    title: "Jardinera Dedicada",
    emoji: "🌻",
    description: "¡150 flores! Tu dedicación es admirable.",
  },
  {
    id: 6,
    flowers: 200,
    title: "Jardín Abundante",
    emoji: "🌼",
    description: "¡200 flores! Tu jardín crece hermoso.",
  },
  {
    id: 7,
    flowers: 250,
    title: "Maestra del Jardín",
    emoji: "🏵️",
    description: "¡250 flores! Eres una verdadera maestra.",
  },
  {
    id: 8,
    flowers: 300,
    title: "Jardín Espectacular",
    emoji: "💐",
    description: "¡300 flores! Tu jardín es espectacular.",
  },
  {
    id: 9,
    flowers: 365,
    title: "Año Completo",
    emoji: "🌸🌼🌻",
    description: "¡Felicidades! Has completado todo tu jardín.",
  },
];

export function getDayFlowerMap(): DayFlowerMap {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem(STORAGE_KEY_DAY_FLOWERS);
  return saved ? JSON.parse(saved) : {};
}

export function getUnlockedFlowers(): number[] {
  const dayMap = getDayFlowerMap();
  return Object.values(dayMap);
}

export function getLastOpenDate(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY_LAST_DATE);
}

export function saveFlowerOpened(flowerId: number): void {
  if (typeof window === "undefined") return;

  // Get current day-flower mapping
  const dayMap = getDayFlowerMap();

  // Get list of already occupied days
  const occupiedDays = Object.keys(dayMap).map(Number);

  // Find available days (1-365)
  const availableDays: number[] = [];
  for (let day = 1; day <= 365; day++) {
    if (!occupiedDays.includes(day)) {
      availableDays.push(day);
    }
  }

  // Select a random day from available days
  if (availableDays.length > 0) {
    const randomDay =
      availableDays[Math.floor(Math.random() * availableDays.length)];
    dayMap[randomDay] = flowerId;
    localStorage.setItem(STORAGE_KEY_DAY_FLOWERS, JSON.stringify(dayMap));
  }

  // Save today's date
  const today = new Date().toISOString().split("T")[0];
  localStorage.setItem(STORAGE_KEY_LAST_DATE, today);
}

export function canOpenToday(): boolean {
  if (typeof window === "undefined") return false;

  // Check if DEV_MODE is enabled (allows unlimited flower openings)
  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";
  if (isDevMode) return true;

  const lastDate = getLastOpenDate();
  const today = new Date().toISOString().split("T")[0];

  return lastDate !== today;
}

export function isDevMode(): boolean {
  return (
    typeof window !== "undefined" && process.env.NEXT_PUBLIC_DEV_MODE === "true"
  );
}

export function getUnlockedMilestones(): number[] {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(STORAGE_KEY_MILESTONES);
  return saved ? JSON.parse(saved) : [];
}

export function unlockMilestone(milestoneId: number): void {
  if (typeof window === "undefined") return;
  const unlocked = getUnlockedMilestones();
  if (!unlocked.includes(milestoneId)) {
    unlocked.push(milestoneId);
    localStorage.setItem(STORAGE_KEY_MILESTONES, JSON.stringify(unlocked));
  }
}

export function getMilestones(): Milestone[] {
  const totalFlowers = Object.keys(getDayFlowerMap()).length;
  const unlocked = getUnlockedMilestones();

  return MILESTONES.map((milestone) => ({
    ...milestone,
    unlocked:
      unlocked.includes(milestone.id) || totalFlowers >= milestone.flowers,
  }));
}

export function checkAndUnlockMilestones(
  totalFlowers: number,
): Milestone | null {
  const unlocked = getUnlockedMilestones();

  // Buscar milestone que se acaba de desbloquear
  const justUnlocked = MILESTONES.find(
    (m) => m.flowers === totalFlowers && !unlocked.includes(m.id),
  );

  if (justUnlocked) {
    unlockMilestone(justUnlocked.id);
    return { ...justUnlocked, unlocked: true };
  }

  return null;
}
