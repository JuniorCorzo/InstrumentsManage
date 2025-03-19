import CardCaption from "@/pages/home/components/table/common/CardCaption";
import LoadingTable from "@/pages/home/components/table/common/LoadingTable";

import { lazy, Suspense } from "react";

const Table = () => {
  const LazyTable = lazy(
    () => import("@/pages/home/components/table/common/RenderRows")
  );

  return (
    <>
      <CardCaption />
      <div className="w-(--breakpoint-lg) border border-slate-50/50">
        <Suspense fallback={<LoadingTable />}>
          <LazyTable />
        </Suspense>
      </div>
    </>
  );
};

export default Table;
