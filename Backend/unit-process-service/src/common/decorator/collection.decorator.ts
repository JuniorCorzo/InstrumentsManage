export function Collection (collectionName: string) {
  return function (target: any) {
    Reflect.defineMetadata('collection_name', collectionName, target)
  }
}
