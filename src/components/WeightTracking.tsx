
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  saveWeightEntry, 
  formatDate, 
  WeightEntry,
  getLastWeightEntry
} from "@/utils/foodDataUtils";

const WeightTracking: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [lastWeight, setLastWeight] = useState<number | null>(null);
  
  useEffect(() => {
    const lastEntry = getLastWeightEntry();
    if (lastEntry) {
      setLastWeight(lastEntry.weight);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!weight) {
      toast.error("Bitte gib dein Gewicht ein");
      return;
    }
    
    const weightEntry: WeightEntry = {
      id: uuidv4(),
      date: formatDate(new Date()),
      weight: parseFloat(weight),
      notes: notes
    };
    
    saveWeightEntry(weightEntry);
    setLastWeight(parseFloat(weight));
    
    // Reset form
    setWeight("");
    setNotes("");
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Gewicht eintragen</CardTitle>
      </CardHeader>
      <CardContent>
        {lastWeight && (
          <div className="mb-4 p-3 bg-secondary rounded-md">
            <p className="text-sm text-muted-foreground">Letzter Eintrag</p>
            <p className="text-lg font-semibold">{lastWeight} kg</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Gewicht (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="z.B. 72.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              placeholder="Optional: Anmerkungen zu diesem Eintrag"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">Eintragen</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeightTracking;
