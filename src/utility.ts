import { QuoteRequestState } from "./components/QuoteInterface";
import {
  DTFRequestDetails,
  DTFSizeChoice,
  DyeSubRequestDetails,
  EmbroideryRequestDetails,
  ScreenPrintRequestDetails,
  SizeQuantity,
} from "./sharedTypes";

export function boolToYesNo(b: boolean) {
  return b ? "Yes" : "No";
}

export function buildQuantitiesBySizeFromState(
  requestState: QuoteRequestState
) {
  const { quantities } = requestState;
  const quantitiesBySize: SizeQuantity[] = [
    {
      size: "Small",
      quantity: quantities.small,
    },
    {
      size: "Medium",
      quantity: quantities.medium,
    },
    {
      size: "Large",
      quantity: quantities.large,
    },
    {
      size: "XL",
      quantity: quantities.large,
    },
    {
      size: "2XL",
      quantity: quantities["2xl"],
    },
    {
      size: "3XL",
      quantity: quantities["3xl"],
    },
    {
      size: "4XL",
      quantity: quantities["4xl"],
    },
  ];
  return quantitiesBySize;
}

export function buildRequestDetailsFromState(requestState: QuoteRequestState) {
  const {
    designType,
    locations: {
      fullBack,
      fullFront,
      leftChest,
      leftSleeve,
      rightChest,
      rightSleeve,
    },
    screenPrintOptions: {
      fullBackColors,
      fullFrontColors,
      leftChestColors,
      leftSleeveColors,
      rightChestColors,
      rightSleeveColors,
    },
    embroideryOptions: {
      leftChestStitches,
      leftSleeveStitches,
      rightChestStitches,
      rightSleeveStitches,
    },
    dyeSubOptions: { hood, pouch },
  } = requestState;

  //put each color count into one array,
  //but only if its corresponding location is set to "true"
  const colorCounts = [
    fullBack && fullBackColors,
    fullFront && fullFrontColors,
    leftChest && leftChestColors,
    leftSleeve && leftSleeveColors,
    rightChest && rightChestColors,
    rightSleeve && rightSleeveColors,
  ]
    .filter((item) => item)
    .map((item) => +item);

  const stitchCounts = [
    leftChest && leftChestStitches,
    rightChest && rightChestStitches,
    leftSleeve && leftSleeveStitches,
    rightSleeve && rightSleeveStitches,
  ]
    .filter((item) => item)
    .map((item) => {
      if (item === false) return "0";
      else return item;
      if (item === "5") return "5";
      else return "10";
    });
  if (designType === "Screen Print") {
    const screenPrintDetails: ScreenPrintRequestDetails = {
      location1ColorCount: colorCounts[0] || 0,
      location2ColorCount: colorCounts[1] || 0,
      location3ColorCount: colorCounts[2] || 0,
      location4ColorCount: colorCounts[3] || 0,
    };
    return screenPrintDetails;
  } else if (designType === "Embroidery") {
    const embroideryDetails: EmbroideryRequestDetails = {
      location1StitchCount: stitchCounts[0] || "0",
      location2StitchCount: stitchCounts[1] || "0",
      location3StitchCount: stitchCounts[2] || "0",
    };
    return embroideryDetails;
  } else if (designType === "DTF") {
    const hasSmall = leftChest || rightChest || leftSleeve || rightSleeve;
    const hasLarge = fullFront || fullBack;
    let sizeChoices: DTFSizeChoice;
    if (hasSmall && !hasLarge) sizeChoices = "small";
    else if (!hasSmall && hasLarge) sizeChoices = "large";
    else sizeChoices = "small and large";
    const dtfDetails: DTFRequestDetails = { sizeChoices };
    return dtfDetails;
  } else {
    const dyeSubDetails: DyeSubRequestDetails = {
      dyeSubLocationCount: hood && pouch ? "2" : "1",
    };
    return dyeSubDetails;
  }
}

export function requestParentWindowAppResize(newHeight: number) {
  window.parent.postMessage(
    {
      type: "pricing-calculator-resize-request",
      height: newHeight,
    },
    "*"
  );
}
