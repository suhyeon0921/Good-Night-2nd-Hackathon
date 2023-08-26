import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

type Review = {
  text: string;
  rating: number;
};

// 영화 상세 정보
export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<{ title?: string; genre?: string } | null>(
    null
  );
  const [newReview, setNewReview] = useState<string>('');
  const [newRating, setNewRating] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // FIXME: 실제 api로 연동
  useEffect(() => {
    setMovie({ title: 'Inception', genre: '액션' });
  }, [id]);

  // 존재하지 않는 영화에 대한 예외 처리
  if (!movie) {
    return (
      <Container>
        <Typography variant='h6'>존재하지 않는 영화입니다.</Typography>
      </Container>
    );
  }

  // Add a new review
  const addReview = () => {
    if (newReview && newRating !== null) {
      setReviews([...reviews, { text: newReview, rating: newRating }]);
      setNewReview('');
      setNewRating(null);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant='h4'>영화 상세 정보: {movie.title}</Typography>
        <Typography variant='subtitle1'>장르: {movie.genre}</Typography>
      </Box>

      <Box my={4}>
        <Typography variant='h6'>리뷰 등록</Typography>
        <TextField
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          label='리뷰'
          variant='outlined'
          fullWidth
          margin='normal'
        />
        <Rating
          value={newRating}
          onChange={(e, newValue) => setNewRating(newValue)}
          precision={0.5}
        />
        <Button variant='contained' color='primary' onClick={addReview}>
          리뷰 추가
        </Button>
      </Box>

      <Box my={4}>
        <Typography variant='h6'>리뷰 목록</Typography>
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index}>
              <ListItemText primary={review.text} />
              <Rating value={review.rating} readOnly />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
