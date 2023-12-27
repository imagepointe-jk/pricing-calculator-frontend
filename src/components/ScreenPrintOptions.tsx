import { GarmentLocation } from "../types";
import { QuoteRequestStateProps } from "./QuoteInterface";

export function ScreenPrintOptions({
  state,
  setState,
}: QuoteRequestStateProps) {
  function changeLocationColorCount(location: GarmentLocation, value: number) {
    const newState = { ...state };
  }

  const {
    locations: {
      fullBack,
      fullFront,
      leftChest,
      leftSleeve,
      rightChest,
      rightSleeve,
    },
  } = state;

  const noLocations =
    !fullBack &&
    !fullFront &&
    !leftChest &&
    !leftSleeve &&
    !rightChest &&
    !rightSleeve;

  return (
    <div>
      {noLocations && <h3>Please select at least one location.</h3>}
      {leftChest && (
        <ScreenPrintColorCountOption
          location="Left Chest"
          changeFn={changeLocationColorCount}
        />
      )}
      {rightChest && (
        <ScreenPrintColorCountOption
          location="Right Chest"
          changeFn={changeLocationColorCount}
        />
      )}
      {fullFront && (
        <ScreenPrintColorCountOption
          location="Full Front"
          changeFn={changeLocationColorCount}
        />
      )}
      {fullBack && (
        <ScreenPrintColorCountOption
          location="Full Back"
          changeFn={changeLocationColorCount}
        />
      )}
      {leftSleeve && (
        <ScreenPrintColorCountOption
          location="Left Sleeve"
          changeFn={changeLocationColorCount}
        />
      )}
      {rightSleeve && (
        <ScreenPrintColorCountOption
          location="Right Sleeve"
          changeFn={changeLocationColorCount}
        />
      )}
    </div>
  );
}

type ScreenPrintColorCountOptionProps = {
  location: GarmentLocation;
  changeFn: (location: GarmentLocation, value: number) => void;
};

function ScreenPrintColorCountOption({
  location,
  changeFn,
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
          <option>{n}</option>
        ))}
      </select>{" "}
    </label>
  );
}
