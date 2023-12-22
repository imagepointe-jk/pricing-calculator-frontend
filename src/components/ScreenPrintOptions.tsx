import { QuoteRequestStateProps } from "./QuoteInterface";

type GarmentLocation =
  | "Left Chest"
  | "Right Chest"
  | "Full Front"
  | "Full Back"
  | "Left Sleeve"
  | "Right Sleeve";

export function ScreenPrintOptions({
  state,
  setState,
}: QuoteRequestStateProps) {
  function changeLocationColorCount(location: GarmentLocation, value: number) {
    const newState = { ...state };
  }

  return (
    <div>
      <ScreenPrintColorCountOption
        location="Left Chest"
        changeFn={changeLocationColorCount}
      />
      <ScreenPrintColorCountOption
        location="Right Chest"
        changeFn={changeLocationColorCount}
      />
      <ScreenPrintColorCountOption
        location="Full Front"
        changeFn={changeLocationColorCount}
      />
      <ScreenPrintColorCountOption
        location="Full Back"
        changeFn={changeLocationColorCount}
      />
      <ScreenPrintColorCountOption
        location="Left Sleeve"
        changeFn={changeLocationColorCount}
      />
      <ScreenPrintColorCountOption
        location="Right Sleeve"
        changeFn={changeLocationColorCount}
      />
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
