import { useState } from "react";
import { DesignType, SizeQuantity } from "../sharedTypes";
import { DesignTypes } from "./DesignTypes";
import { GarmentLocationSelector } from "./GarmentLocationSelector";
import { QuantityFields } from "./QuantityFields";
import styles from "./styles/QuoteInterface.module.css";
import { ScreenPrintOptions } from "./ScreenPrintOptions";

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
      <div>
        <div>Comments</div>
        <textarea name="comments" id="comments" cols={30} rows={10}></textarea>
      </div>
    </div>
  );
}
