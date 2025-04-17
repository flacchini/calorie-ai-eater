
import * as XLSX from 'xlsx';
import { FoodEntry, WeightEntry, getFoodEntries, getWeightEntries } from './foodDataUtils';

// Helper function to convert entries to worksheet
const entriesToWorksheet = <T>(entries: T[]): XLSX.WorkSheet => {
  const worksheet = XLSX.utils.json_to_sheet(entries);
  return worksheet;
};

// Export food entries to Excel
export const exportFoodEntriesToExcel = (): void => {
  try {
    const entries = getFoodEntries();
    if (entries.length === 0) {
      throw new Error("Keine Essenseinträge zum Exportieren vorhanden");
    }
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert entries to worksheet
    const worksheet = entriesToWorksheet(entries);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Essenseinträge");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "KalorienTracker_Essen.xlsx");
  } catch (error) {
    console.error("Error exporting food entries:", error);
    throw error;
  }
};

// Export weight entries to Excel
export const exportWeightEntriesToExcel = (): void => {
  try {
    const entries = getWeightEntries();
    if (entries.length === 0) {
      throw new Error("Keine Gewichtseinträge zum Exportieren vorhanden");
    }
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert entries to worksheet
    const worksheet = entriesToWorksheet(entries);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Gewichtseinträge");
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "KalorienTracker_Gewicht.xlsx");
  } catch (error) {
    console.error("Error exporting weight entries:", error);
    throw error;
  }
};

// Export all data to a single Excel file
export const exportAllDataToExcel = (): void => {
  try {
    const foodEntries = getFoodEntries();
    const weightEntries = getWeightEntries();
    
    if (foodEntries.length === 0 && weightEntries.length === 0) {
      throw new Error("Keine Daten zum Exportieren vorhanden");
    }
    
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add food entries worksheet if there are entries
    if (foodEntries.length > 0) {
      const foodWorksheet = entriesToWorksheet(foodEntries);
      XLSX.utils.book_append_sheet(workbook, foodWorksheet, "Essenseinträge");
    }
    
    // Add weight entries worksheet if there are entries
    if (weightEntries.length > 0) {
      const weightWorksheet = entriesToWorksheet(weightEntries);
      XLSX.utils.book_append_sheet(workbook, weightWorksheet, "Gewichtseinträge");
    }
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, "KalorienTracker_Komplett.xlsx");
  } catch (error) {
    console.error("Error exporting all data:", error);
    throw error;
  }
};
