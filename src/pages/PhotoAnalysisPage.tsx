
import React from "react";
import Layout from "@/components/Layout";
import FoodImageAnalysis from "@/components/FoodImageAnalysis";

const PhotoAnalysisPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Foto analysieren</h1>
        </section>
        
        <section>
          <FoodImageAnalysis />
        </section>
      </div>
    </Layout>
  );
};

export default PhotoAnalysisPage;
