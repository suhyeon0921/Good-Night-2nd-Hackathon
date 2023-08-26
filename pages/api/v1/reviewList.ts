import { fetchWithBaseURL } from '../baseFetch';

interface reviewType {
  id: number;
}

/**
 * 리뷰 목록 조회
 */
export const getReviews = async ({ id }: reviewType) => {
  const response = await fetchWithBaseURL(`/api/v1/reviews?movieId=${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
