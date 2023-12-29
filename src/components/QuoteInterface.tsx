import { useState } from "react";
import { DesignType, SizeQuantity } from "../sharedTypes";
import { DesignTypes } from "./DesignTypes";
import { GarmentLocationSelector } from "./GarmentLocationSelector";
import { QuantityFields } from "./QuantityFields";
import styles from "./styles/QuoteInterface.module.css";
import { ScreenPrintOptions } from "./ScreenPrintOptions";
import { EmbroideryStitchCount, ProductPageFieldValues } from "../types";
import { EmbroideryOptions } from "./EmbroideryOptions";
import { DTFMessage } from "./DTFMessage";
import { DyeSubOptions } from "./DyeSubOptions";
import { boolToYesNo } from "../utility";

type QuoteRequestState = {
  designType: DesignType;
  quantities: {
    small: number;
    medium: number;
    large: number;
    xl: number;
    ["2xl"]: number;
    ["3xl"]: number;
    ["4xl"]: number;
  };
  locations: {
    leftChest: boolean;
    rightChest: boolean;
    fullFront: boolean;
    fullBack: boolean;
    leftSleeve: boolean;
    rightSleeve: boolean;
  };
  screenPrintOptions: {
    leftChestColors: number;
    rightChestColors: number;
    fullFrontColors: number;
    fullBackColors: number;
    leftSleeveColors: number;
    rightSleeveColors: number;
  };
  embroideryOptions: {
    leftChestStitches: EmbroideryStitchCount;
    rightChestStitches: EmbroideryStitchCount;
    leftSleeveStitches: EmbroideryStitchCount;
    rightSleeveStitches: EmbroideryStitchCount;
  };
  dyeSubOptions: {
    pouch: boolean;
    hood: boolean;
  };
};

export type QuoteRequestStateProps = {
  state: QuoteRequestState;
  setState: (newState: QuoteRequestState) => void;
};

const initialState: QuoteRequestState = {
  designType: "Screen Print",
  quantities: {
    small: 0,
    medium: 0,
    large: 0,
    xl: 0,
    "2xl": 0,
    "3xl": 0,
    "4xl": 0,
  },
  locations: {
    fullBack: false,
    fullFront: false,
    leftChest: false,
    leftSleeve: false,
    rightChest: false,
    rightSleeve: false,
  },
  screenPrintOptions: {
    fullBackColors: 1,
    fullFrontColors: 1,
    leftChestColors: 1,
    leftSleeveColors: 1,
    rightChestColors: 1,
    rightSleeveColors: 1,
  },
  embroideryOptions: {
    leftChestStitches: "5k",
    rightChestStitches: "5k",
    leftSleeveStitches: "5k",
    rightSleeveStitches: "5k",
  },
  dyeSubOptions: {
    pouch: false,
    hood: true,
  },
};

export function QuoteInterface() {
  const [requestState, setRequestState] = useState(initialState);
  const { designType } = requestState;

  function buildNewFieldValues(
    newState: QuoteRequestState
  ): ProductPageFieldValues {
    const {
      quantities,
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
    } = newState;
    let newValues: ProductPageFieldValues = {
      designType,
      quantitySmall: quantities.small > 0 ? quantities.small : undefined,
      quantityMedium: quantities.medium > 0 ? quantities.medium : undefined,
      quantityLarge: quantities.large > 0 ? quantities.large : undefined,
      quantityXL: quantities.xl > 0 ? quantities.xl : undefined,
      quantity2XL: quantities["2xl"] > 0 ? quantities["2xl"] : undefined,
      quantity3XL: quantities["3xl"] > 0 ? quantities["3xl"] : undefined,
      quantity4XL: quantities["4xl"] > 0 ? quantities["4xl"] : undefined,
    };

    if (
      designType === "Screen Print" ||
      designType === "DTF" ||
      designType === "Embroidery"
    ) {
      newValues = {
        ...newValues,
        fullBack: boolToYesNo(fullBack),
        fullFront: boolToYesNo(fullFront),
        leftChest: boolToYesNo(leftChest),
        rightChest: boolToYesNo(rightChest),
        leftSleeve: boolToYesNo(leftSleeve),
        rightSleeve: boolToYesNo(rightSleeve),
      };
    }

    if (designType === "Screen Print") {
      newValues = {
        ...newValues,
        fullBackColorCount: fullBack ? fullBackColors : undefined,
        fullFrontColorCount: fullFront ? fullFrontColors : undefined,
        leftChestColorCount: leftChest ? leftChestColors : undefined,
        rightChestColorCount: rightChest ? rightChestColors : undefined,
        leftSleeveColorCount: leftSleeve ? leftSleeveColors : undefined,
        rightSleeveColorCount: rightSleeve ? rightSleeveColors : undefined,
      };
    }

    if (designType === "Embroidery") {
      newValues = {
        ...newValues,
        leftChestStitchCount: leftChest ? leftChestStitches : undefined,
        rightChestStitchCount: rightChest ? rightChestStitches : undefined,
        leftSleeveStitchCount: leftSleeve ? leftSleeveStitches : undefined,
        rightSleeveStitchCount: rightSleeve ? rightSleeveStitches : undefined,
      };
    }

    if (designType === "Dye Sublimation") {
      newValues = {
        ...newValues,
        dyeSubHood: hood,
        dyeSubPouch: pouch,
      };
    }

    return newValues;
  }

  function updateState(newState: QuoteRequestState) {
    setRequestState(newState);
    const newFieldValues = buildNewFieldValues(newState);
    window.parent.postMessage(
      {
        type: "pricing-calculator-field-change-request",
        fieldValues: newFieldValues,
      },
      "*"
    );
  }

  return (
    <div className={styles["main"]}>
      <GarmentLocationSelector state={requestState} setState={updateState} />
      <DesignTypes state={requestState} setState={updateState} />
      <QuantityFields state={requestState} setState={updateState} />
      {designType === "Screen Print" && (
        <ScreenPrintOptions state={requestState} setState={updateState} />
      )}
      {designType === "Embroidery" && (
        <EmbroideryOptions state={requestState} setState={updateState} />
      )}
      {designType === "DTF" && (
        <DTFMessage state={requestState} setState={updateState} />
      )}
      {designType === "Dye Sublimation" && (
        <DyeSubOptions state={requestState} setState={updateState} />
      )}
      <div>
        <div>Comments</div>
        <textarea name="comments" id="comments" cols={30} rows={10}></textarea>
      </div>
    </div>
  );
}
