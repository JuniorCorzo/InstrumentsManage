import { useCamps } from "@/hooks/useCamps";
import useUpdateTable from "../useUpdateTable";
import { useCallback, useEffect, useRef, useState } from "react";
import { useUpdateModal } from "../useUpdateModal";
import { CAMPS_MODAL_FORM } from "@/const/camps.const";
import { useLocationState } from "@/states/queries/useLocationState";
import { onChangeSelect } from "@/interfaces/modal-config.interface";
import { SingleValue } from "react-select";

export const useCampStrategy = () => {
  const { campState, getFormatTable } = useCamps();
  const { setTableContext } = useUpdateTable(
    getFormatTable,
    campState.isLoading
  );

  const [departmentCode, setDepartmentCode] = useState("");
  const prevDepartmentCode = useRef("");
  const disable = useRef(true);
  const { departmentState, municipalityState } = useLocationState();
  const { data: municipalities = [], refetch } =
    municipalityState(departmentCode);

  const handleDepartmentChange = useCallback<onChangeSelect>(
    (
      newValue: SingleValue<{ value: string | undefined; label: string }>
    ): void => {
      const value = departmentState.data?.find(
        ({ departmentName }) => departmentName === newValue?.label
      );
      setDepartmentCode(value?.departmentCode as string);
    },
    [departmentState.data]
  );

  const { setModalForm } = useUpdateModal(
    CAMPS_MODAL_FORM(
      departmentState.data || [],
      municipalities,
      handleDepartmentChange,
      disable.current
    ),
    getFormatTable.tableMetadata?.urlParam
  );

  useEffect(() => {
    if (
      departmentCode !== "" &&
      departmentCode !== prevDepartmentCode.current
    ) {
      refetch();
      disable.current = false;
      prevDepartmentCode.current = departmentCode;
      return;
    }

    setModalForm();
  }, [departmentCode, municipalities, departmentState.data]);

  return { setTableContext, setModalForm };
};
