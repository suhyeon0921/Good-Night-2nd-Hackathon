import { NextApiRequest, NextApiResponse } from 'next';

import { fetchWithBaseURL } from '../baseFetch';

/**
 * 리뷰 생성
 */
export default async function createReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetchWithBaseURL('/api/v1/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (response.status >= 200 && response.status < 300) {
      res.status(200).json({ message: 'Review created successfully!' });
    } else {
      throw new Error('Failed to save Review');
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
