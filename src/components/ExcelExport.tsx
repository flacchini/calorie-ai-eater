
import React from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Download, FileDown } from "lucide-react";
import { 
  exportFoodEntriesToExcel, 
  exportWeightEntriesToExcel,
  exportAllDataToExcel
} from "@/utils/excelExport";

const ExcelExport: React.FC = () => {
  const handleExportFood = () => {
    try {
      exportFoodEntriesToExcel();
      toast.success("Essenseinträge erfolgreich exportiert");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Fehler beim Exportieren der Essenseinträge");
      }
    }
  };
  
  const handleExportWeight = () => {
    try {
      exportWeightEntriesToExcel();
      toast.success("Gewichtseinträge erfolgreich exportiert");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Fehler beim Exportieren der Gewichtseinträge");
      }
    }
  };
  
  const handleExportAll = () => {
    try {
      exportAllDataToExcel();
      toast.success("Alle Daten erfolgreich exportiert");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Fehler beim Exportieren aller Daten");
      }
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Excel Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-4 rounded-md bg-accent">
          <p className="text-sm text-muted-foreground">
            Hier kannst du deine Daten in Excel-Dateien exportieren. Wähle eine der folgenden Optionen:
          </p>
        </div>
        
        <div className="grid gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-3 h-16 px-4"
            onClick={handleExportFood}
          >
            <FileDown className="h-6 w-6 text-nutrition-calories" />
            <div className="text-left">
              <p className="font-medium">Essenseinträge exportieren</p>
              <p className="text-xs text-muted-foreground">Exportiert alle Essenseinträge in eine Excel-Datei</p>
            </div>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-start gap-3 h-16 px-4"
            onClick={handleExportWeight}
          >
            <FileDown className="h-6 w-6 text-nutrition-protein" />
            <div className="text-left">
              <p className="font-medium">Gewichtseinträge exportieren</p>
              <p className="text-xs text-muted-foreground">Exportiert alle Gewichtseinträge in eine Excel-Datei</p>
            </div>
          </Button>
          
          <Button 
            className="flex items-center justify-start gap-3 h-16 px-4"
            onClick={handleExportAll}
          >
            <FileSpreadsheet className="h-6 w-6" />
            <div className="text-left">
              <p className="font-medium">Alle Daten exportieren</p>
              <p className="text-xs text-muted-foreground">Exportiert alle Daten in eine Excel-Datei mit mehreren Sheets</p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExcelExport;
