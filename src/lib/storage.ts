import { DayFlowerMap } from "@/interfaces";

const STORAGE_KEY_DAY_FLOWERS = "mi-jardin-day-flowers";
const STORAGE_KEY_LAST_DATE = "mi-jardin-last-date";

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
