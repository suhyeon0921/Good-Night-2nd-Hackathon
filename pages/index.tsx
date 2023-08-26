import { useState } from 'react';
import Link from 'next/link';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

import { getMovies } from './api/v1/movieList';

type Movie = {
  id: number;
  title: string;
  genre: string;
  isShowing: boolean;
};

export default function Home({ movies }: { movies: Movie[] }) {
  const [genreFilter, setGenreFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const removeMovie = async (id: number) => {
    try {
      const response = await fetch(`/api/v1/movies/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        window.location.reload();
      } else {
        const data = await response.json();
        console.error('An error occurred:', data.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the movie:', error);
    }
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      (genreFilter === '' || movie.genre === genreFilter) &&
      (statusFilter === null || movie.isShowing.toString() === statusFilter)
    );
  });

  return (
    <Container>
      <h1>영화 목록</h1>
      <FormControl
        variant='outlined'
        style={{ marginRight: 10, minWidth: 150 }}
      >
        <InputLabel>장르</InputLabel>
        <Select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value as string)}
          label='장르'
        >
          <MenuItem value='액션'>액션</MenuItem>
          <MenuItem value='코미디'>코미디</MenuItem>
          <MenuItem value='드라마'>드라마</MenuItem>
          <MenuItem value='공포'>공포</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant='outlined'
        style={{ marginRight: 10, minWidth: 150 }}
      >
        <InputLabel>상영 여부</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as string)}
          label='상영 여부'
        >
          <MenuItem value={'true'}>상영중</MenuItem>
          <MenuItem value={'false'}>상영종료</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        style={{ marginRight: 10, minWidth: 150 }}
      >
        <Link href='/add'>영화 추가</Link>
      </Button>
      <List>
        {filteredMovies.map((movie) => (
          <ListItem key={movie.id}>
            <ListItemText>
              <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <Button color='secondary' onClick={() => removeMovie(movie.id)}>
                삭제
              </Button>
              <Button color='primary'>
                <Link href={`/movie/edit/${movie.id}`}>수정</Link>
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const movies = await getMovies();
  return { props: { movies } };
};
