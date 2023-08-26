import { useRouter } from 'next/router';
import { Key, useEffect, useState } from 'react';

import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';

import { useReview } from '../hooks/useReview';
import { getReviews } from '../api/v1/reviewList';

type Review = {
  text: string;
  rating: number;
};

// 영화 상세 정보
export default function MovieDetail({ reviewsData }: any) {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<{
    title: string;
    genre: string;
    releasedAt: string;
    endAt: string;
  } | null>(null);
  const [comment, setComment] = useState<string>('');
  const [score, setScore] = useState<number | null>(null);

  const { mutate: createReview } = useReview();

  const addReview = async () => {
    const reviewData = {
      movieId: Number(id),
      score: score,
      comment: comment,
    };

    createReview({
      reviewData: reviewData,
    });
    window.location.reload();
  };

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setMovie(data);
        })
        .catch((error) => {
          console.error('An error occurred while fetching the data: ', error);
        });
    }
  }, [id]);

  // 존재하지 않는 영화에 대한 예외 처리
  if (!movie) {
    return (
      <Container>
        <Typography variant='h6'>존재하지 않는 영화입니다.</Typography>
      </Container>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant='h4'>영화 상세 정보: {movie.title}</Typography>
        <Typography variant='subtitle1'>장르: {movie.genre}</Typography>
        <Typography variant='subtitle1'>
          개봉일: {formatDate(movie.releasedAt)}
        </Typography>
        <Typography variant='subtitle1'>
          상영종료일: {formatDate(movie.endAt)}
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant='h6'>리뷰 등록</Typography>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label='리뷰'
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Rating
          value={score}
          onChange={(e, newValue) => setScore(newValue)}
          precision={0.5}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          onClick={addReview}
        >
          리뷰 추가
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant='h6'>리뷰 목록</Typography>
        <List>
          {reviewsData.map(
            (
              review: {
                comment: string;
                score: number;
              },
              index: Key | null | undefined
            ) => (
              <ListItem key={index}>
                <ListItemText primary={review.comment} />
                <Rating value={review.score} readOnly />
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context: { query: { id: number } }) {
  const id = context.query.id; // URL에서 id 파라미터 가져오기

  let reviewsData = null;

  // 리뷰 정보 가져오기
  try {
    reviewsData = await getReviews({ id });
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }

  return {
    props: {
      reviewsData: reviewsData,
    },
  };
}
