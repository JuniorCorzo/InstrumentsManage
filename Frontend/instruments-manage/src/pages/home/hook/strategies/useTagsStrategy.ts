import { useTags } from "@/hooks/useTags";
import useUpdateTable from "../useUpdateTable";
import { useUpdateModal } from "../useUpdateModal";
import { TAGS_MODAL_FORM } from "@/const/tags.const";
import { useInstruments } from "@/hooks/useInstruments";
import { useUnitProcess } from "@/hooks/useUnitProcess";

export const useTagsStrategy = () => {
  const { tagsState, getFormatTable } = useTags();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    tagsState.isLoading
  );

  const { instrumentingState } = useInstruments();
  const { unitProcessState } = useUnitProcess();
  const { setModalForm } = useUpdateModal(
    TAGS_MODAL_FORM(
      instrumentingState.instruments,
      unitProcessState.unitProcess
    ),
    getFormatTable.tableMetadata?.urlParam
  );

  return { setTableContext, setModalForm };
};
