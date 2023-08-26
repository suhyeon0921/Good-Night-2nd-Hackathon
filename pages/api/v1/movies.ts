import { fetchWithBaseURL } from '../baseFetch';

/**
 * 영화 목록 조회
 */
export const getMovies = async () => {
  const response = await fetchWithBaseURL(`/api/v1/movies`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
