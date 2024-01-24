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
      quantity: quantities.xl,
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
    let dtfSizeChoices: DTFSizeChoice;
    if (hasSmall && !hasLarge) dtfSizeChoices = "small";
    else if (!hasSmall && hasLarge) dtfSizeChoices = "large";
    else dtfSizeChoices = "small and large";
    const dtfDetails: DTFRequestDetails = { dtfSizeChoices };
    return dtfDetails;
  } else {
    const dyeSubDetails: DyeSubRequestDetails = {
      dyeSubLocationCount: hood && pouch ? "2" : "1",
    };
    return dyeSubDetails;
  }
}

//returns an error string if anything is invalid about the request state
export function checkRequestStateError(
  requestState: QuoteRequestState
): string | null {
  const {
    locations: {
      fullBack,
      fullFront,
      leftChest,
      leftSleeve,
      rightChest,
      rightSleeve,
    },
    designType,
    quantities: {
      small,
      medium,
      large,
      xl,
      "2xl": twoXL,
      "3xl": threeXL,
      "4xl": fourXL,
    },
  } = requestState;
  const locationsSelected = [
    fullBack,
    fullFront,
    leftChest,
    leftSleeve,
    rightChest,
    rightSleeve,
  ].reduce((accum, item) => (item === true ? accum + 1 : accum), 0);
  const totalQuantitiesBySize = [
    small,
    medium,
    large,
    xl,
    twoXL,
    threeXL,
    fourXL,
  ].reduce((accum, item) => accum + item, 0);

  if (locationsSelected === 0 && designType !== "Dye Sublimation") {
    return "Please select at least one location.";
  }
  if (locationsSelected > 2 && designType === "DTF") {
    return "Please select no more than two locations.";
  }
  if (totalQuantitiesBySize === 0) {
    return "Please request at least one of any size.";
  }

  return null;
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

export function requestParentWindowAdaptToAppHeight() {
  requestParentWindowAppResize(
    document.getElementById("root")?.scrollHeight || 900
  );
}

//inform the parent window of whether the user's current input is valid.
//used to determine whether the submit button should be disabled or not.
export function requestParentWindowValidInputUpdate(validInput: boolean) {
  window.parent.postMessage(
    {
      type: "pricing-calculator-valid-input-update",
      validInput,
    },
    "*"
  );
}
