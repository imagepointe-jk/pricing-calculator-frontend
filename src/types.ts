export type GarmentLocation =
  | "Left Chest"
  | "Right Chest"
  | "Full Front"
  | "Full Back"
  | "Left Sleeve"
  | "Right Sleeve";

export type EmbroideryStitchCount = "5k" | "10k";

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
