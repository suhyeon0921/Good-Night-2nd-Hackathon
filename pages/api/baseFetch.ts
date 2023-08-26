export const fetchWithBaseURL = (url: string, options?: RequestInit) => {
  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept',
  };

  const combinedOptions = {
    ...options,
    headers: {
      ...options?.headers,
      ...corsHeaders,
    },
  };

  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, combinedOptions);
};
