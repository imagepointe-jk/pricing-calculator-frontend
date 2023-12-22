import { GarmentSize } from "../sharedTypes";
import { QuoteRequestStateProps } from "./QuoteInterface";
import styles from "./styles/QuantityFields.module.css";

export function QuantityFields({ state, setState }: QuoteRequestStateProps) {
  function onChange(size: GarmentSize, newValue: number) {
    const newState = { ...state };
    if (size === "Small") newState.quantities.small = newValue;
    if (size === "Medium") newState.quantities.medium = newValue;
    if (size === "Large") newState.quantities.large = newValue;
    if (size === "Large") newState.quantities.xl = newValue;
    if (size === "2XL") newState.quantities["2xl"] = newValue;
    if (size === "3XL") newState.quantities["3xl"] = newValue;
    if (size === "4XL") newState.quantities["4xl"] = newValue;
    setState(newState);
  }

  type Field = {
    size: GarmentSize;
    label: string;
  };

  const fields: Field[] = [
    {
      size: "Small",
      label: "S",
    },
    {
      size: "Medium",
      label: "M",
    },
    {
      size: "Large",
      label: "L",
    },
    {
      size: "XL",
      label: "XL",
    },
    {
      size: "2XL",
      label: "2XL",
    },
    {
      size: "3XL",
      label: "3XL",
    },
    {
      size: "4XL",
      label: "4XL",
    },
  ];

  function getStateValueForSize(size: GarmentSize) {
    const { quantities } = state;
    switch (size) {
      case "Small":
        return quantities.small;
      case "Medium":
        return quantities.medium;
      case "Large":
        return quantities.large;
      case "XL":
        return quantities.xl;
      case "2XL":
        return quantities["2xl"];
      case "3XL":
        return quantities["3xl"];
      case "4XL":
        return quantities["4xl"];
    }
  }

  return (
    <div className={styles["main"]}>
      <h4>Quantities</h4>
      <div className={styles["grid"]}>
        {fields.map((field) => (
          <label htmlFor={`quantity-${field.size}`}>
            {field.label}
            <input
              type="number"
              name={`quantity-${field.size}`}
              id={`quantity-${field.size}`}
              value={getStateValueForSize(field.size)}
              onChange={(e) => onChange(field.size, +e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
