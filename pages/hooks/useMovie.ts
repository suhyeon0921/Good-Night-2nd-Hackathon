import { useMutation } from '@tanstack/react-query';

import { useRouter } from 'next/router';

export const fetchMovie = async ({ movieData }: any) => {
  try {
    const response = await fetch('/api/v1/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: movieData.title,
        genre: movieData.genre,
        releasedAt: movieData.releasedAt,
        endAt: movieData.endAt,
      }),
      credentials: 'include',
    });

    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      return false;
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

export const useMovie = (successAction?: () => void) => {
  const router = useRouter();

  return useMutation(fetchMovie, {
    onSuccess: (data) => {
      if (data) {
        alert('Movie created successfully!');
        router.push('/');
      } else {
        alert('Failed to save movie');
      }
      if (successAction) successAction();
    },
  });
};
