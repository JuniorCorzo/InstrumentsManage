import CardCaption from "@/pages/home/components/table/common/CardCaption";
import LoadingTable from "@/pages/home/components/table/common/LoadingTable";
import { lazy, Suspense } from "react";

const Table = () => {
  const LazyTable = lazy(
    () => import("@/pages/home/components/table/common/RenderRows")
  );

  return (
    <table className="table-auto w-full border-separate border-spacing-0 rounded-lg shadow shadow-gray-800">
      <caption className="mb-4">
        <CardCaption />
      </caption>
      <Suspense fallback={<LoadingTable />}>
        <LazyTable />
      </Suspense>
    </table>
  );
};

export default Table;
