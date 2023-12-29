import { z } from "zod";

export const quoteEstimateSchema = z.object({
  Small: z.number(),
  Medium: z.number(),
  Large: z.number(),
  XL: z.number(),
  "2XL": z.number(),
  "3XL": z.number(),
  "4XL": z.number(),
});

export type GarmentLocation =
  | "Left Chest"
  | "Right Chest"
  | "Full Front"
  | "Full Back"
  | "Left Sleeve"
  | "Right Sleeve";

export type ProductPageFieldValues = {
  quantitySmall?: number;
  quantityMedium?: number;
  quantityLarge?: number;
  quantityXL?: number;
  quantity2XL?: number;
  quantity3XL?: number;
  quantity4XL?: number;
  designType?: string;
  leftChest?: string;
  rightChest?: string;
  leftSleeve?: string;
  rightSleeve?: string;
  fullFront?: string;
  fullBack?: string;
  leftChestColorCount?: number;
  rightChestColorCount?: number;
  leftSleeveColorCount?: number;
  rightSleeveColorCount?: number;
  fullFrontColorCount?: number;
  fullBackColorCount?: number;
  leftChestStitchCount?: string;
  rightChestStitchCount?: string;
  leftSleeveStitchCount?: string;
  rightSleeveStitchCount?: string;
  dyeSubPouch?: string;
  dyeSubHood?: string;
  comments?: string;
};

export type QuoteEstimate = z.infer<typeof quoteEstimateSchema>;
