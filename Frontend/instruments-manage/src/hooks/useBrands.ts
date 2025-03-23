import { useMemo } from "react";
import { TableData } from "@/context/TableContext";
import { TABLE_METADATA } from "@/const/table-metadata.const";
import { CreateBrandDTO, UpdateBrandDTO } from "@/models";
import { useBrandState } from "@/states/queries/brands.query";

/**
 * @fileoverview Custom hook for managing CRUD operations for brands using Redux.
 * @module useBrands
 */

/**
 * Hook that provides functionality for managing brands in the application.
 *
 * @returns {Object} An object containing the following properties and methods:
 * @property {BrandDomain[]} brands - Array of brands stored in the state.
 * @property {Function} addBrand - Function to add a new brand.
 * @property {Function} updateBrand - Function to update an existing brand.
 * @property {Function} deleteBrand - Function to delete a brand.
 *
 * @example
 * ```tsx
 * const { brands, addBrand, updateBrand, deleteBrand } = useBrands();
 *
 * // Add a new brand
 * const newBrand = { id: '1', name: 'New Brand' };
 * await addBrand(newBrand);
 *
 * // Update a brand
 * const updatedBrand = { id: '1', name: 'Updated Brand' };
 * await updateBrand(updatedBrand);
 *
 * // Delete a brand
 * await deleteBrand('1');
 * ```
 */
export const useBrands = () => {
  const {
    brandQuery,
    createBrandMutation,
    deleteBrandMutation,
    updateBrandMutation,
  } = useBrandState();
  const { brands } = brandQuery();

  /**
   * Generates the table format for displaying brand data.
   *
   * @returns {TableData} Table structure object containing:
   *   - headers: Array of column headers with 'key' and 'value' for each column
   *   - rows: Array of objects representing each row with brand data
   *
   * @remarks
   * The function uses a side effect (useEffect) to update the table format
   * whenever the brands array changes.
   *
   * @example
   * ```typescript
   * const { getFormatTable } = useBrands();
   * const tableFormat = getFormatTable();
   * // Returns:
   * // {
   * //   headers: [{ key: "name", value: "Marca" }],
   * //   rows: [{ name: "Brand1" }, { name: "Brand2" }]
   * // }
   * ```
   */
  const getFormatTable = useMemo((): TableData => {
    return {
      tableMetadata: TABLE_METADATA.brands,
      columns: [
        {
          accessorKey: "name",
          header: "Marca",
        },
        {
          accessorKey: "country",
          header: "País de Origen",
        },
        {
          accessorKey: "website",
          header: "Website",
        },
      ],
      data: brands.map(({ name, country, website }) => {
        return {
          name,
          country,
          website,
        };
      }),
      messageEmpty: "No se encontraron marcas registradas",
    };
  }, [brands]);

  /**
   * Adds a new brand to the system.
   *
   * @async
   * @param {CreateBrandDTO} brand - Object containing the brand information to create.
   * @throws {Error} If there's an error creating the brand on the server.
   *
   * @example
   * ```typescript
   *  addBrand({
   *   id: '123',
   *   name: 'New Brand',
   *   description: 'Brand description'
   * });
   * ```
   */
  const createBrand = (brand: CreateBrandDTO) => {
    try {
      const { mutate } = createBrandMutation();
      mutate(brand);
    } catch (error) {
      console.error("Error creating brand:", error);
      throw error;
    }
  };

  /**
   * Updates an existing brand in the system.
   *
   * @async
   * @param {UpdateBrandDTO} brand - Object containing the updated brand information.
   * @throws {Error} If there's an error updating the brand on the server.
   *
   * @example
   * ```typescript
   *  updateBrand({
   *   id: '123',
   *   name: 'Updated Brand',
   *   description: 'New description'
   * });
   * ```
   */
  const updateBrand = (brand: UpdateBrandDTO) => {
    try {
      const { mutate } = updateBrandMutation();
      mutate(brand);
    } catch (error) {
      console.error("Error updating brand:", error);
      throw error;
    }
  };

  /**
   * Deletes a brand from the system.
   *
   * @async
   * @param {string} id - Unique identifier of the brand to delete.
   * @throws {Error} If there's an error deleting the brand from the server.
   *
   * @example
   * ```typescript
   *    deleteBrand('123');
   * ```
   */
  const deleteBrand = async (id: string) => {
    try {
      const { mutate } = deleteBrandMutation();
      mutate(id);
    } catch (error) {
      console.error("Error deleting brand:", error);
      throw error;
    }
  };

  return {
    brandsState: brandQuery(),
    getFormatTable,
    createBrand,
    updateBrand,
    deleteBrand,
  };
};
