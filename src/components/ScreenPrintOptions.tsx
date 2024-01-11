import { GarmentLocation } from "../types";
import { QuoteRequestStateProps } from "./QuoteInterface";

export function ScreenPrintOptions({
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
    screenPrintOptions: {
      fullBackColors,
      fullFrontColors,
      leftChestColors,
      leftSleeveColors,
      rightChestColors,
      rightSleeveColors,
    },
  } = state;

  function changeLocationColorCount(location: GarmentLocation, value: number) {
    const newState = { ...state };

    if (location === "Full Back")
      newState.screenPrintOptions.fullBackColors = value;
    if (location === "Full Front")
      newState.screenPrintOptions.fullFrontColors = value;
    if (location === "Left Chest")
      newState.screenPrintOptions.leftChestColors = value;
    if (location === "Right Chest")
      newState.screenPrintOptions.rightChestColors = value;
    if (location === "Right Sleeve")
      newState.screenPrintOptions.rightSleeveColors = value;

    setState(newState);
  }

  //TODO: Show error message for selecting more than 4 locations
  return (
    <div>
      {leftChest && (
        <ScreenPrintColorCountOption
          location="Left Chest"
          selected={leftChestColors}
          changeFn={changeLocationColorCount}
        />
      )}
      {rightChest && (
        <ScreenPrintColorCountOption
          location="Right Chest"
          selected={rightChestColors}
          changeFn={changeLocationColorCount}
        />
      )}
      {fullFront && (
        <ScreenPrintColorCountOption
          location="Full Front"
          selected={fullFrontColors}
          changeFn={changeLocationColorCount}
        />
      )}
      {fullBack && (
        <ScreenPrintColorCountOption
          location="Full Back"
          selected={fullBackColors}
          changeFn={changeLocationColorCount}
        />
      )}
      {leftSleeve && (
        <ScreenPrintColorCountOption
          location="Left Sleeve"
          selected={leftSleeveColors}
          changeFn={changeLocationColorCount}
        />
      )}
      {rightSleeve && (
        <ScreenPrintColorCountOption
          location="Right Sleeve"
          selected={rightSleeveColors}
          changeFn={changeLocationColorCount}
        />
      )}
    </div>
  );
}

type ScreenPrintColorCountOptionProps = {
  location: GarmentLocation;
  selected: number;
  changeFn: (location: GarmentLocation, value: number) => void;
};

function ScreenPrintColorCountOption({
  location,
  changeFn,
  selected,
}: ScreenPrintColorCountOptionProps) {
  const name = `screen-print-${location}`;
  return (
    <label htmlFor={name}>
      {location} Colors{" "}
      <select
        name={name}
        id={name}
        onChange={(e) => changeFn(location, +e.target.value)}
      >
        {[1, 2, 3, 4].map((n) => (
          <option selected={selected === n}>{n}</option>
        ))}
      </select>{" "}
    </label>
  );
}
