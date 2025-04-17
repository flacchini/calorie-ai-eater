
import React from "react";
import Layout from "@/components/Layout";
import WeightTracking from "@/components/WeightTracking";

const WeightLogPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gewicht eintragen</h1>
        </section>
        
        <section>
          <WeightTracking />
        </section>
      </div>
    </Layout>
  );
};

export default WeightLogPage;
