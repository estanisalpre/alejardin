import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  getDayFlowerMap,
  saveFlowerOpened,
  canOpenToday,
  getUnlockedMilestones,
  unlockMilestone,
  getMilestones,
  checkAndUnlockMilestones,
  MILESTONES,
} from "@/lib/storage";

describe("Storage - Day Flower Map", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty object when no data exists", () => {
    const result = getDayFlowerMap();
    expect(result).toEqual({});
  });

  it("should return saved day flower map", () => {
    const mockData = { 1: 10, 2: 20 };
    localStorage.setItem("alejardin-day-flowers", JSON.stringify(mockData));

    const result = getDayFlowerMap();
    expect(result).toEqual(mockData);
  });

  it("should save flower to random available day", () => {
    saveFlowerOpened(5);

    const dayMap = getDayFlowerMap();
    const days = Object.keys(dayMap).map(Number);

    expect(days.length).toBe(1);
    expect(days[0]).toBeGreaterThanOrEqual(1);
    expect(days[0]).toBeLessThanOrEqual(365);
    expect(Object.values(dayMap)[0]).toBe(5);
  });

  it("should not assign same day twice", () => {
    for (let i = 1; i <= 10; i++) {
      saveFlowerOpened(i);
    }

    const dayMap = getDayFlowerMap();
    const days = Object.keys(dayMap).map(Number);
    const uniqueDays = new Set(days);

    expect(days.length).toBe(uniqueDays.size);
  });
});

describe("Storage - Daily Opening Control", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should allow opening on first visit", () => {
    expect(canOpenToday()).toBe(true);
  });

  it("should not allow opening twice same day", () => {
    const today = new Date("2026-03-26");
    vi.setSystemTime(today);

    localStorage.setItem("alejardin-last-date", "2026-03-26");

    expect(canOpenToday()).toBe(false);
  });

  it("should allow opening on next day", () => {
    const today = new Date("2026-03-26");
    vi.setSystemTime(today);

    localStorage.setItem("alejardin-last-date", "2026-03-25");

    expect(canOpenToday()).toBe(true);
  });

  it("should save last open date when opening flower", () => {
    const today = new Date("2026-03-26");
    vi.setSystemTime(today);

    saveFlowerOpened(1);

    const lastDate = localStorage.getItem("alejardin-last-date");
    expect(lastDate).toBe("2026-03-26");
  });
});

describe("Storage - Milestones", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return empty array when no milestones unlocked", () => {
    const result = getUnlockedMilestones();
    expect(result).toEqual([]);
  });

  it("should unlock milestone", () => {
    unlockMilestone(1);

    const unlocked = getUnlockedMilestones();
    expect(unlocked).toContain(1);
  });

  it("should not duplicate milestones", () => {
    unlockMilestone(1);
    unlockMilestone(1);
    unlockMilestone(1);

    const unlocked = getUnlockedMilestones();
    expect(unlocked.filter((id: number) => id === 1).length).toBe(1);
  });

  it("should return all milestones with correct unlock status", () => {
    for (let i = 1; i <= 7; i++) {
      saveFlowerOpened(i);
    }
    unlockMilestone(1);

    const milestones = getMilestones();

    expect(milestones.length).toBe(MILESTONES.length);
    expect(milestones[0].unlocked).toBe(true); // 7 flowers
    expect(milestones[1].unlocked).toBe(false); // 30 flowers
  });

  it("should check and unlock milestone at exact count", () => {
    const result = checkAndUnlockMilestones(7);

    expect(result).not.toBeNull();
    expect(result?.flowers).toBe(7);
    expect(result?.title).toBe("Primera Semana");

    const unlocked = getUnlockedMilestones();
    expect(unlocked).toContain(1);
  });

  it("should not unlock already unlocked milestone", () => {
    unlockMilestone(1);

    const result = checkAndUnlockMilestones(7);

    expect(result).toBeNull();
  });

  it("should not unlock milestone if count does not match exactly", () => {
    const result = checkAndUnlockMilestones(8); // No milestone of 8

    expect(result).toBeNull();
  });
});

describe("Storage - Milestones Definitions", () => {
  it("should have 9 milestones defined", () => {
    expect(MILESTONES.length).toBe(9);
  });

  it("should have unique IDs", () => {
    const ids = MILESTONES.map((m: { id: number }) => m.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });

  it("should have ascending flower counts", () => {
    for (let i = 1; i < MILESTONES.length; i++) {
      expect(MILESTONES[i].flowers).toBeGreaterThan(MILESTONES[i - 1].flowers);
    }
  });

  it("should have first milestone at 7 flowers", () => {
    expect(MILESTONES[0].flowers).toBe(7);
  });

  it("should have last milestone at 365 flowers", () => {
    expect(MILESTONES[MILESTONES.length - 1].flowers).toBe(365);
  });
});
