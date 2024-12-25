import { BrandAdapter } from "@/adapters/brand.adapter"
import { BrandDomain } from "@/interfaces/brand-domain.interface"
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface"
import { BrandDTO } from "@/models"

export const getAllBrands = async (): Promise<BrandDomain[]> => {
    const response = await axios.get('/brands/all').then(response => {
        if (response.status !== 200) throw Error(response.statusText)
        return response.data as RetrieveDataDTO
    })

    return response.data.map((brand) => BrandAdapter(brand as BrandDTO))
}

export const getBrandById = async (id: string): Promise<BrandDomain> => {
    return await axios.get(`/brands?id=${id}`).then(response => {
        if (response.status !== 200) throw Error(response.statusText)
        return BrandAdapter(response.data as BrandDTO)
    })
}

export const createBrand = async (brand: BrandDomain) => {
    axios.post('/brands/create', brand).then(response => {
        if (response.status !== 201) throw Error(response.statusText)
    })
}

export const updateBrand = async (brand: BrandDomain) => {
    axios.put('/brands/update', brand).then(response => {
        if (response.status !== 200) throw Error(response.statusText)
    })
}

export const deleteBrand = async (id: string) => {
    axios.delete(`/brands/delete?id=${id}`).then(response => {
        if (response.status !== 200) throw Error(response.statusText)
    })
}