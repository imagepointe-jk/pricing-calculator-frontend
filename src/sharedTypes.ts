import { z } from "zod";

export const garmentSizes = [
  "Small",
  "Medium",
  "Large",
  "XL",
  "2XL",
  "3XL",
  "4XL",
] as const;
const garmentSizeSchema = z.enum(garmentSizes);

const designTypes = [
  "Screen Print",
  "DTF",
  "Dye Sublimation",
  "Embroidery",
] as const;
const designTypeSchema = z.enum(designTypes);

//actually 5k, 10k, etc.
const stitchCounts = ["5", "10"] as const;
const stitchCountSchema = z.enum(stitchCounts);

const dtfSizeChoices = ["small", "large", "small and large"] as const;
const dtfSizeChoiceSchema = z.enum(dtfSizeChoices);

const locationUpchargeSchema = z.object({
  locationNumber: z.number(),
  colorCount: z.number(),
  upcharge: z.number(),
});

const sizeUpchargeSchema = z.object({
  size: garmentSizeSchema,
  upcharge: z.number(),
});

const dtfSizeQuantityUpchargeSchema = z.object({
  sizeChoices: dtfSizeChoiceSchema,
  quantity: z.number(),
  upcharge: z.number(),
});

const daScreenPrintChargesSchema = z.object({
  singleColorSetupCharge: z.number(),
  eachAdditionalColorSetupCharge: z.number(),
  locationUpcharges: z.array(locationUpchargeSchema),
});

const daEmbroideryChargesSchema = z.object({
  additional5kStitchCharge: z.number(),
});

const daDtfChargesSchema = z.object({
  sizeQuantityUpcharges: z.array(dtfSizeQuantityUpchargeSchema),
});

export const screenPrintRequestDetailsSchema = z.object({
  location1ColorCount: z.number(),
  location2ColorCount: z.number(),
  location3ColorCount: z.number(),
  location4ColorCount: z.number(),
});

export const embroideryRequestDetailsSchema = z.object({
  location1StitchCount: stitchCountSchema,
  location2StitchCount: stitchCountSchema,
  location3StitchCount: stitchCountSchema,
});

export const dtfRequestDetailsSchema = z.object({
  sizeChoices: dtfSizeChoiceSchema,
});

export const dyeSubRequestDetailsSchema = z.object({
  locationCount: z.enum(["1", "2"]),
});

const pricingScheduleEntrySchema = z.object({
  quantity: z.number(),
  pricePerProduct: z.number(),
});

const productSpecificDataSchema = z.object({
  pricingSchedule: z.array(pricingScheduleEntrySchema),
  sizeUpcharges: z.array(sizeUpchargeSchema),
});

const sizeQuantitySchema = z.object({
  quantity: z.number(),
  size: garmentSizeSchema,
});

const quoteRequestSchema = z.object({
  quantitiesBySize: z.array(sizeQuantitySchema),
  productSpecificData: productSpecificDataSchema,
  details: z.union([
    screenPrintRequestDetailsSchema,
    embroideryRequestDetailsSchema,
    dtfRequestDetailsSchema,
    dyeSubRequestDetailsSchema,
  ]),
});

export type LocationUpcharge = z.infer<typeof locationUpchargeSchema>;
export type SizeUpcharge = z.infer<typeof sizeUpchargeSchema>;

export type DAScreenPrintCharges = z.infer<typeof daScreenPrintChargesSchema>;
export type DAEmbroideryCharges = z.infer<typeof daEmbroideryChargesSchema>;
export type DADTFCharges = z.infer<typeof daDtfChargesSchema>;

export type DesignType = z.infer<typeof designTypeSchema>;
export type GarmentSize = z.infer<typeof garmentSizeSchema>;

export type ScreenPrintRequestDetails = z.infer<
  typeof screenPrintRequestDetailsSchema
>;
export type EmbroideryRequestDetails = z.infer<
  typeof embroideryRequestDetailsSchema
>;
export type DTFRequestDetails = z.infer<typeof dtfRequestDetailsSchema>;
export type DyeSubRequestDetails = z.infer<typeof dyeSubRequestDetailsSchema>;

export type PricingScheduleEntry = z.infer<typeof pricingScheduleEntrySchema>;
export type SizeQuantity = z.infer<typeof sizeQuantitySchema>;
export type ProductSpecificData = z.infer<typeof productSpecificDataSchema>;
export type QuoteRequest = z.infer<typeof quoteRequestSchema>;
