import { GarmentLocation } from "../types";
import { QuoteRequestStateProps } from "./QuoteInterface";
import styles from "./styles/GarmentLocationSelector.module.css";
import "./styles/GarmentLocationSelector.css";

export function GarmentLocationSelector({
  state,
  setState,
}: QuoteRequestStateProps) {
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
  } = state;
  function toggleLocationState(location: GarmentLocation) {
    const currentLocationState = parseLocationState(location);
    const newState = { ...state };
    if (location === "Full Back")
      newState.locations.fullBack = !currentLocationState;
    if (location === "Full Front")
      newState.locations.fullFront = !currentLocationState;
    if (location === "Left Chest")
      newState.locations.leftChest = !currentLocationState;
    if (location === "Right Chest")
      newState.locations.rightChest = !currentLocationState;
    if (location === "Left Sleeve")
      newState.locations.leftSleeve = !currentLocationState;
    if (location === "Right Sleeve")
      newState.locations.rightSleeve = !currentLocationState;
    setState(newState);
  }

  function parseLocationState(location: GarmentLocation) {
    const { locations } = state;
    switch (location) {
      case "Full Back":
        return locations.fullBack;
      case "Full Front":
        return locations.fullFront;
      case "Left Chest":
        return locations.leftChest;
      case "Right Chest":
        return locations.rightChest;
      case "Left Sleeve":
        return locations.leftSleeve;
      case "Right Sleeve":
        return locations.rightSleeve;
    }
  }

  const showFullFront = designType !== "Embroidery";
  const showFullBack = designType !== "Embroidery";

  return (
    <div className={styles["main"]}>
      <img src="/garment.png" alt="garment" />
      {showFullBack && (
        <button
          className={`${styles["location-button"]} ${
            fullBack ? styles["selected"] : ""
          }`}
          id="full-back-button"
          onClick={() => toggleLocationState("Full Back")}
        ></button>
      )}
      {showFullFront && (
        <button
          className={`${styles["location-button"]} ${
            fullFront ? styles["selected"] : ""
          }`}
          id="full-front-button"
          onClick={() => toggleLocationState("Full Front")}
        ></button>
      )}
      <button
        className={`${styles["location-button"]} ${
          leftChest ? styles["selected"] : ""
        }`}
        id="left-chest-button"
        onClick={() => toggleLocationState("Left Chest")}
      ></button>
      <button
        className={`${styles["location-button"]} ${
          rightChest ? styles["selected"] : ""
        }`}
        id="right-chest-button"
        onClick={() => toggleLocationState("Right Chest")}
      ></button>
      <button
        className={`${styles["location-button"]} ${
          leftSleeve ? styles["selected"] : ""
        }`}
        id="left-sleeve-button"
        onClick={() => toggleLocationState("Left Sleeve")}
      ></button>
      <button
        className={`${styles["location-button"]} ${
          rightSleeve ? styles["selected"] : ""
        }`}
        id="right-sleeve-button"
        onClick={() => toggleLocationState("Right Sleeve")}
      ></button>
    </div>
  );
}
