import { QuoteRequestStateProps } from "./QuoteInterface";

export function DTFMessage({ state, setState }: QuoteRequestStateProps) {
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

  const locationCount = [
    fullBack,
    fullFront,
    leftChest,
    leftSleeve,
    rightChest,
    rightSleeve,
  ].reduce((accum, item) => (item ? accum + 1 : accum), 0);

  return (
    <div>
      {(locationCount === 0 || locationCount > 2) && (
        <h3>Please select one or two locations.</h3>
      )}
    </div>
  );
}
