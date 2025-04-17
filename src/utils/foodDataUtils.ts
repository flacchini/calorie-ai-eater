
import { toast } from "sonner";

// Types
export interface FoodEntry {
  id: string;
  name: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  notes: string;
}

export interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  notes?: string;
}

// Local Storage Keys
const FOOD_ENTRIES_KEY = "food-tracker-entries";
const WEIGHT_ENTRIES_KEY = "weight-tracker-entries";

// Data Management Functions
export const saveFoodEntry = (entry: FoodEntry): void => {
  try {
    const existingEntries = getFoodEntries();
    const updatedEntries = [...existingEntries, entry];
    localStorage.setItem(FOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
    toast.success("Essen erfolgreich gespeichert");
  } catch (error) {
    console.error("Error saving food entry:", error);
    toast.error("Fehler beim Speichern des Essens");
  }
};

export const getFoodEntries = (): FoodEntry[] => {
  try {
    const entries = localStorage.getItem(FOOD_ENTRIES_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error("Error getting food entries:", error);
    return [];
  }
};

export const deleteFoodEntry = (id: string): void => {
  try {
    const existingEntries = getFoodEntries();
    const updatedEntries = existingEntries.filter((entry) => entry.id !== id);
    localStorage.setItem(FOOD_ENTRIES_KEY, JSON.stringify(updatedEntries));
    toast.success("Eintrag erfolgreich gelöscht");
  } catch (error) {
    console.error("Error deleting food entry:", error);
    toast.error("Fehler beim Löschen des Eintrags");
  }
};

export const saveWeightEntry = (entry: WeightEntry): void => {
  try {
    const existingEntries = getWeightEntries();
    const updatedEntries = [...existingEntries, entry];
    localStorage.setItem(WEIGHT_ENTRIES_KEY, JSON.stringify(updatedEntries));
    toast.success("Gewicht erfolgreich gespeichert");
  } catch (error) {
    console.error("Error saving weight entry:", error);
    toast.error("Fehler beim Speichern des Gewichts");
  }
};

export const getWeightEntries = (): WeightEntry[] => {
  try {
    const entries = localStorage.getItem(WEIGHT_ENTRIES_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error("Error getting weight entries:", error);
    return [];
  }
};

export const deleteWeightEntry = (id: string): void => {
  try {
    const existingEntries = getWeightEntries();
    const updatedEntries = existingEntries.filter((entry) => entry.id !== id);
    localStorage.setItem(WEIGHT_ENTRIES_KEY, JSON.stringify(updatedEntries));
    toast.success("Eintrag erfolgreich gelöscht");
  } catch (error) {
    console.error("Error deleting weight entry:", error);
    toast.error("Fehler beim Löschen des Eintrags");
  }
};

// Helper functions
export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getTodaysFoodEntries = (): FoodEntry[] => {
  const today = formatDate(new Date());
  return getFoodEntries().filter((entry) => entry.date === today);
};

export const getTodaysCalories = (): number => {
  return getTodaysFoodEntries().reduce((total, entry) => total + entry.calories, 0);
};

export const getLastWeightEntry = (): WeightEntry | null => {
  const entries = getWeightEntries();
  if (entries.length === 0) return null;
  
  return entries.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
};

// Get food entries grouped by day for the last 7 days
export const getLastWeekFoodEntries = (): { date: string; calories: number }[] => {
  const today = new Date();
  const result: { date: string; calories: number }[] = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = formatDate(date);
    
    const entries = getFoodEntries().filter((entry) => entry.date === dateString);
    const totalCalories = entries.reduce((sum, entry) => sum + entry.calories, 0);
    
    result.push({
      date: dateString,
      calories: totalCalories
    });
  }
  
  return result;
};

// Get weight entries for the last 30 days
export const getLastMonthWeightEntries = (): WeightEntry[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return getWeightEntries()
    .filter((entry) => new Date(entry.date) >= thirtyDaysAgo)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Calculate health score based on macronutrient balance
export const calculateHealthScore = (protein: number, carbs: number, fat: number): number => {
  // Simple algorithm - can be improved with more sophisticated nutrition logic
  const total = protein + carbs + fat;
  if (total === 0) return 5;
  
  const proteinPercentage = protein / total;
  const carbsPercentage = carbs / total;
  const fatPercentage = fat / total;
  
  // Ideal ranges (simplified)
  const idealProtein = 0.3; // 30%
  const idealCarbs = 0.45; // 45%
  const idealFat = 0.25; // 25%
  
  // Calculate how close to ideal (0-10 scale)
  const proteinScore = 10 - Math.abs(proteinPercentage - idealProtein) * 20;
  const carbsScore = 10 - Math.abs(carbsPercentage - idealCarbs) * 20;
  const fatScore = 10 - Math.abs(fatPercentage - idealFat) * 20;
  
  // Average the scores and ensure within 0-10 range
  let finalScore = (proteinScore + carbsScore + fatScore) / 3;
  return Math.max(0, Math.min(10, finalScore));
};
