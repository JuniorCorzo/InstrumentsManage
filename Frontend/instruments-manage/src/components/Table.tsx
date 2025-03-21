import CardCaption from "@/pages/home/components/table/common/CardCaption";
import LoadingTable from "@/pages/home/components/table/common/LoadingTable";

import { lazy, Suspense } from "react";

const Table = () => {
  const LazyTable = lazy(
    () => import("@/pages/home/components/table/common/RenderTable")
  );

  return (
    <>
      <CardCaption />
      <div className="w-(--breakpoint-lg) border border-border-color/50 shadow-[2px_2px_10px_0px_#2A3747]">
        <Suspense fallback={<LoadingTable />}>
          <LazyTable />
        </Suspense>
      </div>
    </>
  );
};

export default Table;
