
import React from "react";
import Layout from "@/components/Layout";
import FoodTracking from "@/components/FoodTracking";

const FoodLogPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Essen eintragen</h1>
        </section>
        
        <section>
          <FoodTracking />
        </section>
      </div>
    </Layout>
  );
};

export default FoodLogPage;
