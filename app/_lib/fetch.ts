import { cookies } from "next/headers";

const getBody = async <T>(response: Response): Promise<T> => {
  try {
    const text = await response.text();
    if (!text) return {} as T;
    return JSON.parse(text) as T;
  } catch (error) {
    console.error("Error parsing response body:", error);
    return {} as T;
  }
};

const getUrl = (contextUrl: string): string => {
  // Use a fallback to ensure we always have a string
  const baseUrl = String(process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3030");
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanContextUrl = contextUrl.startsWith("/") ? contextUrl : `/${contextUrl}`;
  
  return cleanBaseUrl + cleanContextUrl;
};

const getHeaders = async (initHeaders?: HeadersInit): Promise<Record<string, string>> => {
  const headersObj: Record<string, string> = {};
  
  // 1. Process initial headers safely
  if (initHeaders) {
    if (initHeaders instanceof Headers) {
      initHeaders.forEach((value, key) => {
        headersObj[key] = value;
      });
    } else if (Array.isArray(initHeaders)) {
      initHeaders.forEach(([key, value]) => {
        headersObj[key] = value;
      });
    } else {
      Object.entries(initHeaders).forEach(([key, value]) => {
        if (value) headersObj[key] = String(value);
      });
    }
  }

  // 2. Add cookies safely
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    if (cookieString) {
      headersObj["cookie"] = cookieString;
    }
  } catch (e) {
    console.warn("Failed to get cookies on server:", e);
  }
  
  return headersObj;
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = await getHeaders(options.headers);

  // Re-construct the options to be a clean plain object for fetch compatibility
  const { headers: _origHeaders, ...restOptions } = options;
  
  const requestInit: RequestInit = {
    ...restOptions,
    headers: requestHeaders,
    credentials: "include",
  };

  const response = await fetch(requestUrl, requestInit);
  const data = await getBody<T>(response);

  // Return a structured object that matches the generated client's expectation
  return { 
    status: response.status, 
    data, 
    headers: response.headers 
  } as any;
};