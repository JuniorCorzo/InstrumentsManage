import { INSTRUMENTS_MODAL_FORM } from "@/const/instruments.const";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import {
  ModalConfig,
  onChangeSelect,
} from "@/interfaces/modal-config.interface";
import { SingleValue } from "react-select";
import { useEffect, useCallback, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { useBrands } from "./useBrands";
import { TAGS_MODAL_FORM } from "@/const/tags.const";
import { useInstruments } from "./useInstruments";
import { useUnitProcess } from "./useUnitProcess";
import { BRANDS_MODAL_FORM } from "@/const/brands.const";
import { UNIT_PROCESS_MODAL_FORM } from "@/const/unit-process.const";
import { useCamps } from "./useCamps";
import { CAMPS_MODAL_FORM } from "@/const/camps.const";
import { useLocationState } from "@/states/queries/useLocationState";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>();
  const [departmentCode, setDepartmentCode] = useState<string>("");
  const prevDepartmentCode = useRef<string>("");

  const [searchParams] = useSearchParams();
  const param = searchParams.get("table");

  const { instruments, brands, tags, unitProcess, camps } = TABLE_METADATA;
  const { brandsState } = useBrands();
  const { instrumentingState } = useInstruments();
  const { unitProcessState } = useUnitProcess();
  const { campState } = useCamps();
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
      console.log(value, departmentState.data);
      setDepartmentCode(value?.departmentCode as string);
    },
    [departmentState.data]
  );

  useEffect(() => {
    if (
      departmentCode !== "" &&
      departmentCode !== prevDepartmentCode.current
    ) {
      refetch();
      prevDepartmentCode.current = departmentCode;
    }
  }, [departmentCode, refetch]);

  useEffect(() => {
    if (!param) return;

    switch (param) {
      case instruments.urlParam:
        setModalConfig(INSTRUMENTS_MODAL_FORM(brandsState.brands));
        break;

      case tags.urlParam:
        setModalConfig(
          TAGS_MODAL_FORM(
            instrumentingState.instruments,
            unitProcessState.unitProcess
          )
        );
        break;

      case brands.urlParam:
        setModalConfig(BRANDS_MODAL_FORM());
        break;

      case unitProcess.urlParam:
        setModalConfig(UNIT_PROCESS_MODAL_FORM(campState.camps));
        break;

      case camps.urlParam:
        setModalConfig(
          CAMPS_MODAL_FORM(
            departmentState?.data || [],
            municipalities,
            handleDepartmentChange
          )
        );
        break;
    }
  }, [
    param,
    brandsState.brands,
    instrumentingState.instruments,
    unitProcessState.unitProcess,
    campState.camps,
    departmentState?.data,
    municipalities,
    handleDepartmentChange,
  ]);

  return {
    showModal,
    modalConfig,
    setShowModal,
  };
};
