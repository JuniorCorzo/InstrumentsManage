import { TableContextProvider } from "@/context/TableContext";
import Layout from "../../layouts/Layout";
import InstrumentsTable from "./components/table/entity-tables/InstrumentsTable";
import BrandsTable from "./components/table/entity-tables/BrandsTable";
import { useSearchParams } from "react-router";
import TagsTable from "./components/table/entity-tables/TagsTable";
import UnitProcessTable from "./components/table/entity-tables/UnitProcessTable";
import CampsTable from "./components/table/entity-tables/CampsTable";

const Home = () => {
  const [searchParams] = useSearchParams();
  /* 
    TODO: Para mejorar todo esto vamos a realizar un refactor al componente <Table /> 
    TODO: para que realice la selecion de los datos automaticamente con los paran de la url
   */
  const selectDataToView = () => {
    const param = searchParams.get("useData");
    switch (param) {
      case "instruments":
        return <InstrumentsTable />;

      case "brands":
        return <BrandsTable />;

      case "tags":
        return <TagsTable />;

      case "unitProcess":
        return <UnitProcessTable />;

      case "camps":
        return <CampsTable />;

      default:
        return <InstrumentsTable />;
    }
  };

  return (
    <Layout>
      <TableContextProvider>
        <section className="flex flex-col px-20 items-center gap-3">
          <article className="flex w-full justify-center">
            {selectDataToView()}
          </article>
        </section>
      </TableContextProvider>
    </Layout>
  );
};

export default Home;
