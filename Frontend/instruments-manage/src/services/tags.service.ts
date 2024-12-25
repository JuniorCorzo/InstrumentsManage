import { TagsAdapter } from "@/adapters/tags.adapter"
import { GATEWAY_HOST } from "@/config/env.config"
import { RetrieveDataDTO } from "@/interfaces/retrieve-data.interface"
import { TagsDomain } from "@/interfaces/tags-domain.interface"
import { TagsDTO } from "@/models"

export const getAllTags = async (): Promise<TagsDomain[]> => {
    const response = await axios
        .get(`${GATEWAY_HOST}/tags/all`)
                .then(response => {
                    if (response.status !== 200) throw Error(response.statusText)
                    return response.data as RetrieveDataDTO
                })
    return response.data.map(tags => TagsAdapter(tags as TagsDTO))
}

export const getTagsById = async (id: string): Promise<TagsDomain> => {
    return await axios.get(`${GATEWAY_HOST}/tags?id=${id}`).then(response => {
        if (response.status !== 200) throw Error(response.statusText)

        return TagsAdapter(
            (response.data as RetrieveDataDTO)
                .data[0] as TagsDTO
        )
    })
}

export const createTags = async (tags: TagsDomain) => {
    axios.post(`${GATEWAY_HOST}/tags/create`, tags)
        .then(response => {
            if (response.status !== 201) throw Error(response.statusText)
        })
}

export const updateTags = async (tags: TagsDomain) => {
    axios.put(`${GATEWAY_HOST}/tags/update`, tags)
        .then(response => {
            if (response.status !== 200) throw Error(response.statusText)
        })
}

export const deleteTags = async (id: string) => {
    axios.delete(`${GATEWAY_HOST}/tags/delete?id=${id}`)
        .then(response => {
            if (response.status !== 200) throw Error(response.statusText)
        })
}