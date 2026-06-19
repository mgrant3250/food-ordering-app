export async function fetchJSON<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

export const fetchAuthJSON = <T>(
  url: string,
  token: string,
  options: RequestInit = {}
) =>
  fetchJSON<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });