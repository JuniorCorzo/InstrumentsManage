import { BrandDomain } from "@/interfaces/brand-domain.interface";
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../services/brands.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";
import { useToast } from "@/hooks/useToast";

const useBrandState = () => {
  const { displayToast } = useToast();
  const brandQuery = () => {
    const {
      data: brands = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<BrandDomain[]>({
      queryKey: ["brands"],
      queryFn: getAllBrands,
      throwOnError: () => {
        clientQuery.setQueryData(["brands"], () => {
          return [];
        });
        return false;
      },
    });

    return { brands, isLoading, isError, refetch };
  };

  const createBrandMutation = useMutation({
    mutationFn: createBrand,
    onSuccess(newBrand) {
      clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
        if (brandState == null) return [newBrand];
        return [...brandState, newBrand];
      });

      displayToast({
        type: "success",
        message: "La marca se añadió correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo añadir la marca, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const updateBrandMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess(updatedBrand) {
      clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
        const index = brandState.findIndex(({ id }) => id === updatedBrand.id);

        if (index !== -1) return;
        brandState[index] = updatedBrand;
      });

      displayToast({
        type: "success",
        message: "La marca se actualizó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message:
          "No se pudo actualizar la marca, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  const deleteBrandMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess(_, idDelete) {
      clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
        return brandState.filter(({ id }) => {
          id !== idDelete;
        });
      });

      displayToast({
        type: "success",
        message: "La marca se eliminó correctamente",
      });
    },
    onError: () => {
      displayToast({
        message: "No se pudo eliminar la marca, vuelve a intentarlo mas tarde.",
        type: "error",
      });
    },
  });

  return {
    brandQuery,
    createBrandMutation,
    updateBrandMutation,
    deleteBrandMutation,
  };
};

export { useBrandState };
