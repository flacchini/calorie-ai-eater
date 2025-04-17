
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import DashboardCharts from "@/components/DashboardCharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Weight, CircleCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getTodaysCalories, getLastWeightEntry, getTodaysFoodEntries } from "@/utils/foodDataUtils";

const Index = () => {
  const [todaysCalories, setTodaysCalories] = useState(0);
  const [lastWeight, setLastWeight] = useState<number | null>(null);
  const [foodEntries, setFoodEntries] = useState<number>(0);
  
  useEffect(() => {
    // Get today's calories
    setTodaysCalories(getTodaysCalories());
    
    // Get last weight entry
    const lastEntry = getLastWeightEntry();
    if (lastEntry) {
      setLastWeight(lastEntry.weight);
    }
    
    // Get today's food entries count
    setFoodEntries(getTodaysFoodEntries().length);
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <Button size="sm" asChild>
            <Link to="/food-log" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Essen eintragen
            </Link>
          </Button>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Heute</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Apple className="h-5 w-5 text-nutrition-calories" />
                {todaysCalories} kcal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {foodEntries} Einträge heute
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Aktuelles Gewicht</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Weight className="h-5 w-5 text-nutrition-protein" />
                {lastWeight ? `${lastWeight} kg` : "Kein Eintrag"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lastWeight ? (
                <p className="text-sm text-muted-foreground">
                  Letzter Eintrag
                </p>
              ) : (
                <Button size="sm" variant="link" className="p-0" asChild>
                  <Link to="/weight-log">Jetzt eintragen</Link>
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Excel Export</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-primary" />
                Daten sichern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="link" className="p-0" asChild>
                <Link to="/export">Excel exportieren</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <DashboardCharts />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
