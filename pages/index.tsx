import Link from 'next/link';

import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';

import { getMovies } from './api/v1/movies';

type Movie = {
  id: number;
  title: string;
  genre: string;
};

export default function Home({ movies }: { movies: Movie[] }) {
  const removeMovie = (id: number) => {
    // TODO: 실제 API를 호출하여 영화 삭제
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

// 이 부분이 SSR을 위한 부분입니다.
export const getServerSideProps = async () => {
  const movies = await getMovies();
  return { props: { movies } };
};
