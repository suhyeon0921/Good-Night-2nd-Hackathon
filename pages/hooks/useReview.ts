import { useMutation } from '@tanstack/react-query';

export const fetchReview = async ({ reviewData }: any) => {
  try {
    const response = await fetch('/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
      credentials: 'include',
    });

    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      const data = await response.json();
      console.log('Server Error:', data);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return false;
    } else {
      console.error('An unknown error occurred');
      return false;
    }
  }
};

export const useReview = (successAction?: () => void) => {
  return useMutation(fetchReview, {
    onSuccess: (data) => {
      if (data) {
        alert('Movie created successfully!');
      } else {
        alert('Failed to save movie');
      }
      if (successAction) successAction();
    },
  });
};
