import { INSTRUMENTS_MODAL_FORM } from "@/const/instruments.const";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { ModalConfig } from "@/interfaces/modal-config.interface";
import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useBrands } from "./useBrands";
import { TAGS_MODAL_FORM } from "@/const/tags.const";
import { useInstruments } from "./useInstruments";
import { useUnitProcess } from "./useUnitProcess";
import { BRANDS_MODAL_FORM } from "@/const/brands.const";
import { UNIT_PROCESS_MODAL_FORM } from "@/const/unit-process.const";
import { useCamps } from "./useCamps";
import { CAMPS_MODAL_FORM } from "@/const/camps.const";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>();

  const [searchParams] = useSearchParams();
  const param = searchParams.get("table");
  const { instruments, brands, tags, unitProcess, camps } = TABLE_METADATA;
  const { brandsState } = useBrands();
  const { instrumentingState } = useInstruments();
  const { unitProcessState } = useUnitProcess();
  const { campState } = useCamps();

  useLayoutEffect(() => {
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
        setModalConfig(CAMPS_MODAL_FORM());
        break;
    }
  }, [param]);

  return {
    showModal,
    setShowModal,
    modalConfig,
  };
};
