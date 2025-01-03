import { useCamp } from "@/hooks/useCamp";
import useUpdateTable from "../hook/useUpdateTable";
import { CampDomain } from "@/interfaces/camp-domain.interface";

const CampsTable = () => {
  const { camp, getFormatTable } = useCamp();
  useUpdateTable<CampDomain>(camp, getFormatTable);

  return <table />;
};

export default CampsTable;
