import { TableContextProvider } from "@/context/TableContext";
import Layout from "../../layouts/Layout";
import Table from "@/components/Table";
import CardCaption from "./components/table/common/CardCaption";

const Home = () => {
  return (
    <Layout>
      <section className="w-full flex flex-col items-center gap-3">
        <article className="flex flex-col gap-6">
          <TableContextProvider>
            <Table />
          </TableContextProvider>
        </article>
      </section>
    </Layout>
  );
};

export default Home;
