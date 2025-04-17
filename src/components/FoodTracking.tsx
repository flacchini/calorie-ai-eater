
import React, { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { 
  saveFoodEntry, 
  formatDate, 
  FoodEntry,
  calculateHealthScore
} from "@/utils/foodDataUtils";

const FoodTracking: React.FC = () => {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [notes, setNotes] = useState("");
  const [healthScore, setHealthScore] = useState(5);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName || !calories) {
      toast.error("Bitte gib mindestens den Namen und die Kalorien ein");
      return;
    }
    
    const proteinNum = parseFloat(protein) || 0;
    const carbsNum = parseFloat(carbs) || 0;
    const fatNum = parseFloat(fat) || 0;
    
    // Calculate health score if not manually adjusted
    const calculatedHealthScore = calculateHealthScore(proteinNum, carbsNum, fatNum);
    
    const foodEntry: FoodEntry = {
      id: uuidv4(),
      name: foodName,
      date: formatDate(new Date()),
      calories: parseFloat(calories),
      protein: proteinNum,
      carbs: carbsNum,
      fat: fatNum,
      healthScore: healthScore,
      notes: notes
    };
    
    saveFoodEntry(foodEntry);
    
    // Reset form
    setFoodName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setNotes("");
    setHealthScore(5);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Essen eintragen</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food-name">Lebensmittel / Mahlzeit</Label>
            <Input
              id="food-name"
              placeholder="z.B. Müsli mit Joghurt"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="calories">Kalorien (kcal)</Label>
            <Input
              id="calories"
              type="number"
              placeholder="z.B. 350"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protein">Eiweiß (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="z.B. 15"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="carbs">Kohlenhydrate (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="z.B. 45"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fat">Fett (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="z.B. 12"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="health-score">Gesundheitsscore</Label>
              <span className="text-sm font-medium">{healthScore} / 10</span>
            </div>
            <Slider
              id="health-score"
              min={0}
              max={10}
              step={1}
              value={[healthScore]}
              onValueChange={(value) => setHealthScore(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notizen</Label>
            <Textarea
              id="notes"
              placeholder="Optional: Weitere Infos oder Anmerkungen"
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

export default FoodTracking;
