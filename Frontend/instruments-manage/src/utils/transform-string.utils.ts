export const transformToString = (arrayConvert: string[] | number[]): string => {
    return arrayConvert.map((str, index) => {
        if (arrayConvert.length -1 !== index) { return `${str}, ` }
        return str
    }).join()
}