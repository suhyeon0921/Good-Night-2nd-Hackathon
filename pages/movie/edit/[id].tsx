import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import {
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

type Movie = {
  title: string;
  genre: string;
  releasedAt: string;
  endAt: string;
};

// 영화 수정
export default function EditMovie() {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<Partial<Movie> | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/v1/movies/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMovie(data);
        })
        .catch((error) => {
          console.error('An error occurred while fetching the data: ', error);
        });
    }
  }, [id]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  // 영화 정보가 아직 로드되지 않았을 때
  if (!movie) {
    return (
      <Container>
        <h1>영화 정보를 불러오는 중...</h1>
      </Container>
    );
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString();
      };

      const updatedMovie = {
        ...movie,
        releasedAt: movie.releasedAt ? formatDate(movie.releasedAt) : '',
        endAt: movie.endAt ? formatDate(movie.endAt) : '',
      };

      const response = await fetch(`/api/v1/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMovie),
      });

      if (response.status === 200) {
        console.log('수정 성공');
        router.push('/');
      } else {
        const data = await response.json();
        console.error('An error occurred:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while updating the movie:', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <h1>영화 수정: {movie.title}</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            name='title'
            label='제목'
            variant='outlined'
            value={movie.title || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <FormControl fullWidth variant='outlined' margin='normal'>
            <InputLabel>장르</InputLabel>
            <Select
              name='genre'
              value={movie.genre || ''}
              onChange={handleInputChange as any}
              label='장르'
            >
              <MenuItem value='액션'>액션</MenuItem>
              <MenuItem value='코미디'>코미디</MenuItem>
              <MenuItem value='드라마'>드라마</MenuItem>
              <MenuItem value='공포'>공포</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name='releasedAt'
            label='개봉일'
            type='date'
            variant='outlined'
            value={movie.releasedAt || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name='endAt'
            label='상영 종료일'
            type='date'
            variant='outlined'
            value={movie.endAt || ''}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant='contained' color='primary' type='submit'>
            수정 완료
          </Button>
        </form>
      </Box>
    </Container>
  );
}
