export type Mood = "happy" | "thirsty" | "sunny" | "hungry";
export type GrowthStage = "seedling" | "sprout" | "bloom";

export interface PlantState {
  hydration: number;
  sunlight: number;
  nutrients: number;
  mood: Mood;
  growthStage: GrowthStage;
  name: string;
}
