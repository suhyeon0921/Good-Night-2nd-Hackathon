import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

type Movie = {
  id: number;
  title: string;
  genre: string;
};

// 영화 목록
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([
    { id: 1, title: 'Inception', genre: 'Sci-fi' },
    { id: 2, title: 'Avengers', genre: 'Action' },
  ]);

  const removeMovie = (id: number) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <Container>
      <h1>영화 목록</h1>
      <Button variant='contained' color='primary'>
        <Link href='/add'>영화 추가</Link>
      </Button>
      <List>
        {movies.map((movie) => (
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
