import { useState } from "react";
import { DesignType, SizeQuantity } from "../sharedTypes";
import { DesignTypes } from "./DesignTypes";
import { GarmentLocationSelector } from "./GarmentLocationSelector";
import { QuantityFields } from "./QuantityFields";
import styles from "./styles/QuoteInterface.module.css";
import { ScreenPrintOptions } from "./ScreenPrintOptions";
import { EmbroideryStitchCount } from "../types";
import { EmbroideryOptions } from "./EmbroideryOptions";
import { DTFMessage } from "./DTFMessage";
import { DyeSubOptions } from "./DyeSubOptions";

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

  return (
    <div className={styles["main"]}>
      <GarmentLocationSelector
        state={requestState}
        setState={setRequestState}
      />
      <DesignTypes state={requestState} setState={setRequestState} />
      <QuantityFields state={requestState} setState={setRequestState} />
      {designType === "Screen Print" && (
        <ScreenPrintOptions state={requestState} setState={setRequestState} />
      )}
      {designType === "Embroidery" && (
        <EmbroideryOptions state={requestState} setState={setRequestState} />
      )}
      {designType === "DTF" && (
        <DTFMessage state={requestState} setState={setRequestState} />
      )}
      {designType === "Dye Sublimation" && (
        <DyeSubOptions state={requestState} setState={setRequestState} />
      )}
      <div>
        <div>Comments</div>
        <textarea name="comments" id="comments" cols={30} rows={10}></textarea>
      </div>
    </div>
  );
}
