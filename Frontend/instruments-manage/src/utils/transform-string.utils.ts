export const transformToString = (
  arrayConvert: string[] | number[]
): string => {
  return arrayConvert
    .map((str) => {
      return str;
    })
    .join(", ");
};
