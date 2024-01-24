import { useEffect, useState } from "react";
import { getProductData, getQuoteRequestEstimate } from "../fetch";
import {
  DesignType,
  EmbroideryStitchCount,
  ProductSpecificData,
  QuoteRequest,
} from "../sharedTypes";
import { ProductPageFieldValues, QuoteEstimate } from "../types";
import {
  boolToYesNo,
  buildQuantitiesBySizeFromState,
  buildRequestDetailsFromState,
  checkRequestStateError,
  requestParentWindowValidInputUpdate,
} from "../utility";
import {
  parseQuoteEstimateResponse,
  parseWooCommerceProductData,
} from "../validations";
import { EstimateArea } from "./EstimateArea";
import { GarmentLocationSelector } from "./GarmentLocationSelector";
import { InputTabs } from "./InputTabs";
import styles from "./styles/QuoteInterface.module.css";
import { LoadingIndicator } from "./LoadingIndicator";
import { ErrorMessage } from "./ErrorMessage";

export type QuoteRequestState = {
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
  comments: string;
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
    leftChestStitches: "5",
    rightChestStitches: "5",
    leftSleeveStitches: "5",
    rightSleeveStitches: "5",
  },
  dyeSubOptions: {
    pouch: false,
    hood: true,
  },
  comments: "",
};

const interfaceId = "pricing-calculator-interface";

export function QuoteInterface() {
  const [requestState, setRequestState] = useState(initialState);
  const [requestStateError, setRequestStateError] = useState(
    null as string | null
  ); //whether there's anything wrong with the user's current request options
  const [productData, setProductData] = useState(
    null as ProductSpecificData | null
  );
  const [productDataLoading, setProductDataLoading] = useState(true);
  const [quoteEstimate, setQuoteEstimate] = useState(
    null as QuoteEstimate | null
  );
  const [quoteEstimateLoading, setQuoteEstimateLoading] = useState(false);
  const { designType, comments } = requestState;

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
      comments: newState.comments,
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
        dyeSubHood: boolToYesNo(hood),
        dyeSubPouch: boolToYesNo(pouch),
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

  useEffect(() => {
    window.addEventListener("message", async (e) => {
      const allowed = true; //TODO: Actually add allowed origins
      if (!allowed) {
        console.log("Received a message from disallowed origin " + e.origin);
        return;
      }

      if (e.data.type === "pricing-calculator-product-data-response") {
        try {
          const productName = e.data.productName;
          if (typeof productName !== "string") {
            throw new Error("No product name provided.");
          }
          const productDataFetched = await getProductData(productName);
          const json = await productDataFetched.json();
          const parsedJson = parseWooCommerceProductData(json);
          setProductData(parsedJson);
          setProductDataLoading(false);
        } catch (error) {
          setProductDataLoading(false);
          console.error("Invalid product data response!", error);
        }
      }
    });

    window.parent.postMessage(
      { type: "pricing-calculator-product-data-request" },
      "*"
    );
  }, []);

  useEffect(() => {
    async function getEstimate() {
      if (!productData) return;
      setQuoteEstimate(null);
      const error = checkRequestStateError(requestState);
      if (error) {
        setRequestStateError(error);
        requestParentWindowValidInputUpdate(false);
        return;
      }
      requestParentWindowValidInputUpdate(true);
      setRequestStateError(null);

      try {
        setQuoteEstimateLoading(true);

        const request: QuoteRequest = {
          details: buildRequestDetailsFromState(requestState),
          productSpecificData: productData,
          quantitiesBySize: buildQuantitiesBySizeFromState(requestState),
        };

        const response = await getQuoteRequestEstimate(request);
        const json = await response.json();
        const parsed = parseQuoteEstimateResponse(json);

        setQuoteEstimate(parsed);
        setQuoteEstimateLoading(false);
      } catch (error) {
        setQuoteEstimateLoading(false);
        console.error("Error fetching quote estimate", error);
      }
    }
    getEstimate();
  }, [requestState]);

  //currently the app should not need to resize when state changes
  // useEffect(() => {
  //   const heightToRequest =
  //     document.getElementById(interfaceId)?.scrollHeight || 0;
  //   requestParentWindowAppResize(heightToRequest);
  // });

  return (
    <div className={styles["main"]}>
      {!productData && productDataLoading && <LoadingIndicator />}
      {!productData && !productDataLoading && <ErrorMessage />}
      {productData && (
        <>
          <div className={styles["product-header"]}>
            <img
              className={styles["product-image"]}
              src={productData.imageUrl}
              alt=""
            />
            <h2>{productData.productName}</h2>
          </div>
          <div className={styles["column-flex"]} id={interfaceId}>
            <div className={styles["primary-column"]}>
              <GarmentLocationSelector
                state={requestState}
                setState={updateState}
              />
              <InputTabs
                state={requestState}
                setState={updateState}
                anyError={requestStateError !== null}
              />
              {requestStateError && <h3>{requestStateError}</h3>}
            </div>
            <div className={styles["secondary-column"]}>
              <div>
                <EstimateArea
                  quoteEstimate={quoteEstimate}
                  loading={quoteEstimateLoading}
                />
              </div>
              <div>
                <div>Comments</div>
                <textarea
                  name="comments"
                  id="comments"
                  cols={30}
                  rows={10}
                  value={comments}
                  onChange={(e) =>
                    updateState({ ...requestState, comments: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
