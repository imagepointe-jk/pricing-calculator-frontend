import { QuoteRequest } from "./sharedTypes";

const serverURL = () =>
  //@ts-ignore
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : //@ts-ignore
      import.meta.env.VITE_SERVER_URL;

//@ts-ignore
const wcKey = import.meta.env.VITE_WOOCOMMERCE_API_KEY;
//@ts-ignore
const wcSecret = import.meta.env.VITE_WOOCOMMERCE_API_SECRET;
if (!wcKey || !wcSecret) {
  console.error("Couldn't find at least one of the WooCommerce API variables!");
}

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

export function getProductData(productName: string) {
  const headers = new Headers();
  headers.append("Authorization", `Basic ${btoa(`${wcKey}:${wcSecret}`)}`);

  var requestOptions = {
    method: "GET",
    headers: headers,
  };

  return fetch(
    `https://www.imagepointe.com/wp-json/wc/v3/products?search=${productName}`,
    requestOptions
  );
}
