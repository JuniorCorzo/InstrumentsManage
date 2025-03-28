import { BrandDomain } from "@/interfaces/brand-domain.interface";
import {
  getAllBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../services/brands.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { clientQuery } from "../client/client-query";

const useBrandState = () => {
  const brandQuery = () => {
    const {
      data: brands = [],
      isLoading,
      isError,
      refetch,
    } = useQuery<BrandDomain[]>({
      queryKey: ["brands"],
      queryFn: getAllBrands,
    });

    return { brands, isLoading, isError, refetch };
  };

  const createBrandMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: createBrand,
      onSuccess(newBrand) {
        clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
          if (brandState == null) return [newBrand];
          return [...brandState, newBrand];
        });
      },
    });

    return { mutate, isPending };
  };

  const updateBrandMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: updateBrand,
      onSuccess(updatedBrand) {
        clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
          const index = brandState.findIndex(
            ({ id }) => id === updatedBrand.id
          );

          if (index !== -1) return;
          brandState[index] = updatedBrand;
        });
      },
    });

    return { mutate, isPending };
  };

  const deleteBrandMutation = () => {
    const { mutate, isPending } = useMutation({
      mutationFn: deleteBrand,
      onSuccess(_, idDelete) {
        clientQuery.setQueryData(["brands"], (brandState: BrandDomain[]) => {
          return brandState.filter(({ id }) => {
            id !== idDelete;
          });
        });
      },
    });

    return { mutate, isPending };
  };

  return {
    brandQuery,
    createBrandMutation,
    updateBrandMutation,
    deleteBrandMutation,
  };
};

export { useBrandState };
