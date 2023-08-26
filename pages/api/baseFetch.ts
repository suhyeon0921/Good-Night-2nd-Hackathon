export const fetchWithBaseURL = (url: string, options?: RequestInit) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, options);
};
