import { productSpecificDataSchema, stitchCountSchema } from "./sharedTypes";

export function parseProductDataResponse(obj: any) {
  return productSpecificDataSchema.parse(obj);
}
