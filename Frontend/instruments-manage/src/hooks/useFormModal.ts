import { formToTagsDTO } from "@/adapters/tags.adapter";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { CreateBrandDTO, CreateCampDTO, CreateUnitProcessDTO } from "@/models";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { useInstruments } from "./useInstruments";
import { useBrands } from "./useBrands";
import { useTags } from "./useTags";
import { useUnitProcess } from "./useUnitProcess";
import { useCamps } from "./useCamps";
import { formToInstrumentsDTO } from "@/adapters/instruments.adapter";

export const useFormModal = () => {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("table");
  const { instruments, brands, tags, unitProcess, camps } = TABLE_METADATA;
  const { createInstrument } = useInstruments();
  const { createBrand } = useBrands();
  const { createTag } = useTags();
  const { createUnitProcess } = useUnitProcess();
  const { createCamp } = useCamps();

  const sendData = useRef<(formData: FormData) => boolean>();

  const sendInstrument = (formData: FormData): boolean => {
    const instrument = formToInstrumentsDTO(formData);
    createInstrument(instrument);
    return true;
  };

  const sendBrand = (formData: FormData): boolean => {
    const names = Object.fromEntries(formData.entries());
    const brand = names as CreateBrandDTO;
    createBrand(brand);
    return true;
  };

  const sendTag = (formData: FormData): boolean => {
    const names = Object.fromEntries(formData.entries());
    const tag = formToTagsDTO(names);
    createTag(tag);
    return true;
  };

  const sendUnitProcess = (formData: FormData): boolean => {
    const names = Object.fromEntries(formData.entries());
    const unitProcess = names as unknown as CreateUnitProcessDTO;
    createUnitProcess(unitProcess);
    return true;
  };

  const sendCamp = (formData: FormData): boolean => {
    const names = Object.fromEntries(formData.entries());
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
