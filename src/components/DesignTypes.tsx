import { QuoteRequestStateProps } from "./QuoteInterface";
import styles from "./styles/QuoteInterface.module.css";

export function DesignTypes({ state, setState }: QuoteRequestStateProps) {
  return (
    <div>
      <h4>Design Type</h4>
      <div className={styles["design-type-options"]}>
        <label htmlFor="screen-print-option">
          <input type="radio" name="design-type" id="screen-print-option" />
          Screen Print
        </label>
        <label htmlFor="embroidery-option">
          <input type="radio" name="design-type" id="embroidery-option" />
          Embroidery
        </label>
        <label htmlFor="dtf-option">
          <input type="radio" name="design-type" id="dtf-option" />
          DTF
        </label>
        <label htmlFor="dye-sub-option">
          <input type="radio" name="design-type" id="dye-sub-option" />
          Dye Sublimation
        </label>
      </div>
    </div>
  );
}
