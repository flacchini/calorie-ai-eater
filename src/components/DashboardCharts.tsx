
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getLastWeekFoodEntries, getLastMonthWeightEntries } from "@/utils/foodDataUtils";

const DashboardCharts: React.FC = () => {
  const calorieData = getLastWeekFoodEntries();
  const weightData = getLastMonthWeightEntries().map(entry => ({
    date: entry.date,
    weight: entry.weight
  }));

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Kalorien (letzte 7 Tage)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                tickFormatter={(value) => `${value} kcal`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value} kcal`, "Kalorien"]}
                labelFormatter={(label) => `Datum: ${formatDate(label)}`}
              />
              <Bar 
                dataKey="calories" 
                name="Kalorien" 
                fill="#EF4444" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Gewicht (letzter Monat)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                tick={{ fontSize: 12 }} 
              />
              <YAxis 
                domain={['dataMin - 1', 'dataMax + 1']}
                tickFormatter={(value) => `${value} kg`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`${value} kg`, "Gewicht"]}
                labelFormatter={(label) => `Datum: ${formatDate(label)}`}
              />
              <Area 
                type="monotone" 
                dataKey="weight" 
                stroke="#4F46E5" 
                fill="#4F46E580" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
