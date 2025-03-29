import { formToTagsDTO } from "@/adapters/tags.adapter";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import {
  CreateBrandDTO,
  CreateCampDTO,
  CreateInstrumentsDTO,
  CreateUnitProcessDTO,
} from "@/models";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useInstruments } from "./useInstruments";
import { useBrands } from "./useBrands";
import { useTags } from "./useTags";
import { useUnitProcess } from "./useUnitProcess";
import { useCamps } from "./useCamps";

export const useFormModal = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("table");
  const { instruments, brands, tags, unitProcess, camps } = TABLE_METADATA;
  const { createInstrument } = useInstruments();
  const { createBrand } = useBrands();
  const { createTag } = useTags();
  const { createUnitProcess } = useUnitProcess();
  const { createCamp } = useCamps();

  const sendData =
    useRef<(names: { [key: string]: FormDataEntryValue }) => boolean>();

  const sendInstrument = (names: {
    [key: string]: FormDataEntryValue;
  }): boolean => {
    const instrument = names as unknown as CreateInstrumentsDTO;
    createInstrument(instrument);
    return true;
  };

  const sendBrand = (names: { [key: string]: FormDataEntryValue }): boolean => {
    const brand = names as CreateBrandDTO;
    createBrand(brand);
    return true;
  };

  const sendTag = (names: { [key: string]: FormDataEntryValue }): boolean => {
    const tag = formToTagsDTO(names);
    console.table(tag);
    createTag(tag);
    return true;
  };

  const sendUnitProcess = (names: {
    [key: string]: FormDataEntryValue;
  }): boolean => {
    const unitProcess = names as unknown as CreateUnitProcessDTO;
    createUnitProcess(unitProcess);
    return true;
  };

  const sendCamp = (names: { [key: string]: FormDataEntryValue }): boolean => {
    const camp = names as unknown as CreateCampDTO;
    createCamp(camp);
    return true;
  };

  useEffect(() => {
    switch (param) {
      case instruments.urlParam:
        sendData.current = sendInstrument;
        break;
      case tags.urlParam:
        sendData.current = sendTag;
        break;
      case brands.urlParam:
        sendData.current = sendBrand;
        break;
      case unitProcess.urlParam:
        sendData.current = sendUnitProcess;
        break;
      case camps.urlParam:
        sendData.current = sendCamp;
        break;
    }
  }, [param]);

  return { sendData: sendData.current };
};
