import Link from 'next/link';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import { getMovies } from './api/v1/movieList';

type Movie = {
  id: number;
  title: string;
  genre: string;
};

export default function Home({ movies }: { movies: Movie[] }) {
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

export const getServerSideProps = async () => {
  const movies = await getMovies();
  return { props: { movies } };
};
