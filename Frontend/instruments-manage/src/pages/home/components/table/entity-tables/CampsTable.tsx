import { useCamps } from "@/hooks/useCamps";
import useUpdateTable from "../hook/useUpdateTable";
import { CampDomain } from "@/interfaces/camp-domain.interface";

const CampsTable = () => {
  const { camp, getFormatTable } = useCamps();
  useUpdateTable<CampDomain>(camp, getFormatTable);

  return <table />;
};

export default CampsTable;
