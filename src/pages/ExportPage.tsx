
import React from "react";
import Layout from "@/components/Layout";
import ExcelExport from "@/components/ExcelExport";

const ExportPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Excel Export</h1>
        </section>
        
        <section>
          <ExcelExport />
        </section>
      </div>
    </Layout>
  );
};

export default ExportPage;
