import { QuoteEstimate } from "../types";
import { LoadingIndicator } from "./LoadingIndicator";

type EstimateAreaProps = {
  quoteEstimate: QuoteEstimate | null;
  loading: boolean;
};

export function EstimateArea({ quoteEstimate, loading }: EstimateAreaProps) {
  return (
    <div>
      <h4>Price Estimate {"(per product)"}</h4>
      {loading && <LoadingIndicator />}
      {quoteEstimate === null && !loading && <h5>No Estimate</h5>}
      {quoteEstimate !== null && !loading && (
        <>
          <div>Small: ${quoteEstimate.Small.toFixed(2)}</div>
          <div>Medium: ${quoteEstimate.Medium.toFixed(2)}</div>
          <div>Large: ${quoteEstimate.Large.toFixed(2)}</div>
          <div>XL: ${quoteEstimate.XL.toFixed(2)}</div>
          <div>2XL: ${quoteEstimate["2XL"].toFixed(2)}</div>
          <div>3XL: ${quoteEstimate["3XL"].toFixed(2)}</div>
          <div>4XL: ${quoteEstimate["4XL"].toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
