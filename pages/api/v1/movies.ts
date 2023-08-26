import { NextApiRequest, NextApiResponse } from 'next';

import { fetchWithBaseURL } from '../baseFetch';

/**
 * 영화 생성
 */
export default async function createMovie(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { title, genre, releasedAt, endAt } = req.body;

    const response = await fetchWithBaseURL(`/api/v1/movies`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        genre,
        releasedAt,
        endAt,
      }),
    });

    if (response.status >= 200 && response.status < 300) {
      res.status(200).json({ message: 'Movie created successfully!' });
    } else {
      throw new Error('Failed to save Movie');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('An unknown error occurred');
      res.status(500).json({ error: 'Server error' });
    }
  }
}
