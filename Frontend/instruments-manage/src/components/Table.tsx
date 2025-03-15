import CardCaption from "@/pages/home/components/table/common/CardCaption";
import LoadingTable from "@/pages/home/components/table/common/LoadingTable";
import Pagination from "@/pages/home/components/table/common/Pagination";
import { lazy, Suspense } from "react";

const Table = () => {
  const LazyTable = lazy(
    () => import("@/pages/home/components/table/common/RenderRows")
  );

  return (
    <>
      <CardCaption />
      <div className="max-w-screen-lg border border-gray-800">
        <Suspense fallback={<LoadingTable />}>
          <LazyTable />
        </Suspense>
      </div>
    </>
  );
};

export default Table;
