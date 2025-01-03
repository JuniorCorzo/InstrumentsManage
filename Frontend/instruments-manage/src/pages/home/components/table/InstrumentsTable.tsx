import Table from "@/components/Table";
import { TableDataContext } from "@/context/TableContext";
import { useInstruments } from "@/hooks/useInstruments";
import { useContext, useEffect } from "react";

const InstrumentsTable = () => {
  const { instruments } = useInstruments();
  const { setData } = useContext(TableDataContext);
  // TODO: Refactorizar en un custom hook 
  useEffect(() => {
    setData({
      headers: [
        {
          key: "model",
          value: "Modelo",
        },
        {
          key: "brand",
          value: "Marca",
        },
        {
          key: "type",
          value: "Tipo de Instrumento",
        },
      ],
      rows: instruments.map(({ brand, model, type }) => {
        return {
          model,
          type,
          brand: brand.name,
        };
      }),
    });
  }, [instruments, setData]);

  return (
    <section className="flex flex-col px-20 items-center gap-3">
      <article className="flex w-full justify-center">
        <Table></Table>
      </article>
    </section>
  );
};

export default InstrumentsTable;
