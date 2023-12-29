import { EmbroideryStitchCount, stitchCounts } from "../sharedTypes";
import { GarmentLocation } from "../types";
import { QuoteRequestStateProps } from "./QuoteInterface";

export function EmbroideryOptions({ state, setState }: QuoteRequestStateProps) {
  const {
    locations: { leftChest, leftSleeve, rightChest, rightSleeve },
    embroideryOptions: {
      leftChestStitches,
      leftSleeveStitches,
      rightChestStitches,
      rightSleeveStitches,
    },
  } = state;
  const noLocations = !leftChest && !leftSleeve && !rightChest && !rightSleeve;

  function changeLocationStitchCount(
    location: GarmentLocation,
    newCount: EmbroideryStitchCount
  ) {
    const newState = { ...state };

    if (location === "Left Chest")
      newState.embroideryOptions.leftChestStitches = newCount;
    if (location === "Right Chest")
      newState.embroideryOptions.rightChestStitches = newCount;
    if (location === "Left Sleeve")
      newState.embroideryOptions.leftSleeveStitches = newCount;
    if (location === "Right Sleeve")
      newState.embroideryOptions.rightSleeveStitches = newCount;

    setState(newState);
  }

  return (
    <div>
      {noLocations && <h3>Please select at least one location.</h3>}
      {leftChest && (
        <EmbroideryStitchCountOption
          changeFn={changeLocationStitchCount}
          location="Left Chest"
          selected={leftChestStitches}
        />
      )}
      {rightChest && (
        <EmbroideryStitchCountOption
          changeFn={changeLocationStitchCount}
          location="Right Chest"
          selected={rightChestStitches}
        />
      )}
      {leftSleeve && (
        <EmbroideryStitchCountOption
          changeFn={changeLocationStitchCount}
          location="Left Sleeve"
          selected={leftSleeveStitches}
        />
      )}
      {rightSleeve && (
        <EmbroideryStitchCountOption
          changeFn={changeLocationStitchCount}
          location="Right Sleeve"
          selected={rightSleeveStitches}
        />
      )}
    </div>
  );
}

type EmbroideryStitchCountOptionProps = {
  location: GarmentLocation;
  selected: EmbroideryStitchCount;
  changeFn: (
    location: GarmentLocation,
    newCount: EmbroideryStitchCount
  ) => void;
};

function EmbroideryStitchCountOption({
  changeFn,
  location,
  selected,
}: EmbroideryStitchCountOptionProps) {
  const name = `embroidery-${location}`;
  return (
    <label htmlFor={name}>
      {location} Stitch Count{" "}
      <select
        name={name}
        id={name}
        value={selected}
        onChange={(e) =>
          changeFn(location, e.target.value as EmbroideryStitchCount)
        }
      >
        {stitchCounts.map((n) => (
          <option>{`${n}k`}</option>
        ))}
      </select>{" "}
    </label>
  );
}
