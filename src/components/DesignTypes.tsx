import { DesignType } from "../sharedTypes";
import { QuoteRequestStateProps } from "./QuoteInterface";
import styles from "./styles/QuoteInterface.module.css";

export function DesignTypes({ state, setState }: QuoteRequestStateProps) {
  function setDesignType(newType: DesignType) {
    setState({ ...state, designType: newType });
  }

  return (
    <div>
      <h4>Design Type</h4>
      <div className={styles["design-type-options"]}>
        <label htmlFor="screen-print-option">
          <input
            type="radio"
            name="design-type"
            id="screen-print-option"
            onChange={() => setDesignType("Screen Print")}
            checked={state.designType === "Screen Print"}
          />
          Screen Print
        </label>
        <label htmlFor="embroidery-option">
          <input
            type="radio"
            name="design-type"
            id="embroidery-option"
            onChange={() => setDesignType("Embroidery")}
            checked={state.designType === "Embroidery"}
          />
          Embroidery
        </label>
        <label htmlFor="dtf-option">
          <input
            type="radio"
            name="design-type"
            id="dtf-option"
            onChange={() => setDesignType("DTF")}
            checked={state.designType === "DTF"}
          />
          DTF
        </label>
        <label htmlFor="dye-sub-option">
          <input
            type="radio"
            name="design-type"
            id="dye-sub-option"
            onChange={() => setDesignType("Dye Sublimation")}
            checked={state.designType === "Dye Sublimation"}
          />
          Dye Sublimation
        </label>
      </div>
    </div>
  );
}
