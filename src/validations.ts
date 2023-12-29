import { productSpecificDataSchema } from "./sharedTypes";
import { quoteEstimateSchema } from "./types";

export function parseProductDataResponse(obj: any) {
  return productSpecificDataSchema.parse(obj);
}

export function parseQuoteEstimateResponse(json: any) {
  return quoteEstimateSchema.parse(json);
}
