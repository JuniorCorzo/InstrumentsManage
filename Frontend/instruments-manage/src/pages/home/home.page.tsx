import { TableContextProvider } from "@/context/TableContext";
import Layout from "../../layouts/Layout";
import Table from "@/components/Table";

const Home = () => {
  return (
    <Layout>
      <section className="w-full flex flex-col items-center gap-3">
        <TableContextProvider>
          <Table />
        </TableContextProvider>
      </section>
    </Layout>
  );
};

export default Home;
