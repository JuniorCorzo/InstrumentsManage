import { useSelector } from "react-redux"

import { Dispatch, RootState } from "@/redux/stores/general.store"

import { BrandDomain } from "@/interfaces/brand-domain.interface"
import { fetchBrands, removeBrand, setBrand, setUpdateBrand } from "@/redux/reducers/brands.reducer"
import { useDispatch } from "react-redux"
import { createBrand, updateBrand } from "@/services/brands.service"

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
    const dispatch = useDispatch<Dispatch>()
    const brands = useSelector<RootState, BrandDomain[]>(
        (state) => state.brands.data
    )

    /**
     * Fetches all brands from the server and stores them in the state.
     * @private
     */
    const fetchAllBrands = () => {
        dispatch(fetchBrands())
    }
    if (brands.length === 0) fetchAllBrands()      
        
    /**
     * Adds a new brand to the system.
     * 
     * @async
     * @param {BrandDomain} brand - Object containing the brand information to create.
     * @throws {Error} If there's an error creating the brand on the server.
     * 
     * @example
     * ```typescript
     * await addBrand({
     *   id: '123',
     *   name: 'New Brand',
     *   description: 'Brand description'
     * });
     * ```
     */
    const addBrand = async (brand: BrandDomain) => {
        try {
            await createBrand(brand)
            dispatch(setBrand(brand))
        } catch (error) {
            console.error('Error creating brand:', error)
            throw error
        }
    }   

    /**
     * Updates an existing brand in the system.
     * 
     * @async
     * @param {BrandDomain} brand - Object containing the updated brand information.
     * @throws {Error} If there's an error updating the brand on the server.
     * 
     * @example
     * ```typescript
     * await updateBrand({
     *   id: '123',
     *   name: 'Updated Brand',
     *   description: 'New description'
     * });
     * ```
     */
    const update = async (brand: BrandDomain) => {
        try {
            await updateBrand(brand)
            dispatch(setUpdateBrand(brand))
        } catch (error) {
            console.error('Error updating brand:', error)
            throw error
        }
    }   

    /**
     * Deletes a brand from the system.
     * 
     * @async
     * @param {string} id - Unique identifier of the brand to delete.
     * @throws {Error} If there's an error deleting the brand from the server.
     * 
     * @example
     * ```typescript
     * await deleteBrand('123');
     * ```
     */
    const deleteBrand = async (id: string) => {
        try {
            await deleteBrand(id)
            dispatch(removeBrand(id))
        } catch (error) {
            console.error('Error deleting brand:', error)
            throw error
        }
    }   

    return {
        brands,
        addBrand,
        updateBrand: update,
        deleteBrand
    }
}