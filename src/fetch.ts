import { QuoteRequest } from "./sharedTypes";

const serverURL = () =>
  //@ts-ignore
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : //@ts-ignore
      import.meta.env.VITE_SERVER_URL;

export function getQuoteRequestEstimate(request: QuoteRequest) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(request),
    headers,
  };
  return fetch(`${serverURL()}/quote-request`, requestOptions);
}
