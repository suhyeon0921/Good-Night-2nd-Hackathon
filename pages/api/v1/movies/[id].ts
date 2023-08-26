import type { NextApiRequest, NextApiResponse } from 'next';

import { fetchWithBaseURL } from '../../baseFetch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  const apiUrl = `/api/v1/movies/${id}`;

  switch (method) {
    case 'GET':
      // 영화 정보 조회
      const fetchRes = await fetchWithBaseURL(apiUrl);
      const data = await fetchRes.json();
      res.status(fetchRes.status).json(data);
      break;

    case 'PUT':
      // 영화 정보 수정
      const putRes = await fetchWithBaseURL(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const putData = await putRes.json();
      res.status(200).json(putData);
      break;

    case 'DELETE':
      // 영화 정보 삭제
      const delRes = await fetchWithBaseURL(apiUrl, {
        method: 'DELETE',
      });
      if (delRes.status === 204) {
        res.status(200).json({ message: 'Deleted successfully' });
      } else {
        res.status(delRes.status).json({ message: 'An error occurred' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
