import { QuoteRequestStateProps } from "./QuoteInterface";

export function DyeSubOptions({ state, setState }: QuoteRequestStateProps) {
  const {
    dyeSubOptions: { hood, pouch },
  } = state;

  function toggleLocation(location: "pouch" | "hood") {
    const newState = { ...state };

    if (location === "hood") {
      newState.dyeSubOptions.hood = !newState.dyeSubOptions.hood;
      newState.dyeSubOptions.pouch = true;
    } else {
      newState.dyeSubOptions.pouch = !newState.dyeSubOptions.pouch;
      newState.dyeSubOptions.hood = true;
    }

    setState(newState);
  }

  return (
    <div>
      <label htmlFor="dye-sub-hood">
        <input
          type="checkbox"
          name="dye-sub-hood"
          id="dye-sub-hood"
          checked={hood}
          onChange={() => toggleLocation("hood")}
        />
        Hood
      </label>
      <label htmlFor="dye-sub-pouch">
        <input
          type="checkbox"
          name="dye-sub-pouch"
          id="dye-sub-pouch"
          checked={pouch}
          onChange={() => toggleLocation("pouch")}
        />
        Pouch
      </label>
    </div>
  );
}
