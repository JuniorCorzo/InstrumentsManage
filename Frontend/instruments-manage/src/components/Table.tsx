import CardCaption from "@/pages/home/components/table/common/CardCaption";
import LoadingTable from "@/pages/home/components/table/common/LoadingTable";

import { lazy, Suspense } from "react";
import AddButton from "./modal/AddButton";

const Table = () => {
  const LazyTable = lazy(
    () => import("@/pages/home/components/table/common/RenderTable")
  );

  //TODO:: Para el gap de article tener en cuenta el boton si esta aparece el gap sera de 3, si no se aparece el gap sera de 6
  return (
    <article className="flex flex-col p-10 gap-3">
      <CardCaption />
      <div className="flex pr-2 justify-end">
        <AddButton />
      </div>
      <div className="w-(--breakpoint-lg) border border-border-color/50 shadow-[2px_2px_10px_0px_#2A3747]">
        <Suspense fallback={<LoadingTable />}>
          <LazyTable />
        </Suspense>
      </div>
    </article>
  );
};

export default Table;
