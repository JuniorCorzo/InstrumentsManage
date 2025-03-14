import { TableContextProvider } from "@/context/TableContext";
import Layout from "../../layouts/Layout";
import Table from "@/components/Table";

const Home = () => {
  return (
    <Layout>
      <section className="flex flex-col px-14 pt-14 gap-3">
        <article className="flex w-full justify-center">
          <TableContextProvider>
            <Table />
          </TableContextProvider>
        </article>
      </section>
    </Layout>
  );
};

export default Home;
