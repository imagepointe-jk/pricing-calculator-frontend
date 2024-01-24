import {
  GarmentSize,
  PricingScheduleEntry,
  ProductSpecificData,
  SizeUpcharge,
  productSpecificDataSchema,
} from "./sharedTypes";
import { quoteEstimateSchema } from "./types";

export function parseProductDataResponse(obj: any) {
  return productSpecificDataSchema.parse(obj);
}

export function parseQuoteEstimateResponse(json: any) {
  return quoteEstimateSchema.parse(json);
}

export function parseWooCommerceProductData(json: any) {
  const product = json[0];
  const imageUrl = product.images[0]
    ? product.images[0].src
    : "https://placehold.co/300x300?text=Not+Found";
  const productName = product.name;

  const pricingSchedule = parseWooCommercePricingSchedule(product);
  const sizeUpcharges = parseWooCommerceSizeUpcharges(product);

  const productData: ProductSpecificData = {
    imageUrl,
    productName,
    pricingSchedule,
    sizeUpcharges,
  };

  return productSpecificDataSchema.parse(productData);
}

function parseWooCommerceSizeUpcharges(product: any) {
  const twoXL: GarmentSize = "2XL";
  const threeXL: GarmentSize = "3XL";
  const fourXL: GarmentSize = "4XL";
  const unparsedSizeUpcharges = [
    {
      size: twoXL,
      upcharge: findWooCommerceMetadataValue(product, "da_2xl_upcharge") || "",
    },
    {
      size: threeXL,
      upcharge: findWooCommerceMetadataValue(product, "da_3xl_upcharge") || "",
    },
    {
      size: fourXL,
      upcharge: findWooCommerceMetadataValue(product, "da_4xl_upcharge") || "",
    },
  ];

  const sizeUpcharges: SizeUpcharge[] = unparsedSizeUpcharges
    .filter((item) => !isNaN(+item.upcharge))
    .map((item) => {
      const sizeUpcharge: SizeUpcharge = {
        size: item.size,
        upcharge: +item.upcharge,
      };
      return sizeUpcharge;
    });

  return sizeUpcharges;
}

function parseWooCommercePricingSchedule(product: any) {
  const unparsedPricingSchedule = [
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_1") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_1") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_2") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_2") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_3") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_3") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_4") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_4") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_5") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_5") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_6") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_6") || "",
    },
    {
      quantity: findWooCommerceMetadataValue(product, "promo_quantity_7") || "",
      pricePerProduct:
        findWooCommerceMetadataValue(product, "promo_price_7") || "",
    },
  ];

  const pricingSchedule: PricingScheduleEntry[] = unparsedPricingSchedule
    .filter((item) => {
      const withoutDollar = item.pricePerProduct.replace("$", "");
      return (
        !isNaN(+withoutDollar) &&
        +withoutDollar !== 0 &&
        !isNaN(+item.quantity) &&
        +item.quantity !== 0
      );
    })
    .map((item) => {
      const entry: PricingScheduleEntry = {
        quantity: +item.quantity,
        pricePerProduct: +item.pricePerProduct,
      };
      return entry;
    });

  return pricingSchedule;
}

function findWooCommerceMetadataValue(product: any, key: string) {
  const meta = product.meta_data.find((data: any) => data.key === key);
  return meta ? `${meta.value}` : undefined;
}
