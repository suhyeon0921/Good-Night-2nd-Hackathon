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
  releaseDate: string;
  description: string;
};

// 영화 수정
export default function EditMovie() {
  const router = useRouter();
  const { id } = router.query;

  // FIXME: 실제 API를 호출하여 영화 정보를 가져와야 함
  const [movie, setMovie] = useState<Partial<Movie> | null>(null);

  useEffect(() => {
    // FIXME: 실제 API를 호출하여 영화 정보를 가져와야 함
    setMovie({
      title: '예시 영화',
      genre: '액션',
      releaseDate: '2023-01-01',
      description: '이것은 예시 영화입니다.',
    });
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

  return (
    <Container>
      <Box my={4}>
        <h1>영화 수정: {movie.title}</h1>
        <form>
          <TextField
            name='title'
            label='제목'
            variant='outlined'
            value={movie.title}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
          />
          <FormControl fullWidth variant='outlined' margin='normal'>
            <InputLabel>장르</InputLabel>
            <Select
              name='genre'
              value={movie.genre}
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
            name='releaseDate'
            label='개봉일'
            type='date'
            variant='outlined'
            value={movie.releaseDate}
            onChange={handleInputChange}
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name='description'
            label='설명'
            variant='outlined'
            value={movie.description}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            margin='normal'
          />
          <Button variant='contained' color='primary'>
            수정 완료
          </Button>
        </form>
      </Box>
    </Container>
  );
}
