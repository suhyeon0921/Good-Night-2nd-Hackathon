import { useState } from 'react';

import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from 'next/link';

// 영화 등록 페이지
// TODO: 영화 등록 연결
export default function AddMovie() {
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleGenreChange = (event: SelectChangeEvent<string>) => {
    setGenre(event.target.value as string);
  };

  const handleReleaseDateChange = (date: any) => {
    setReleaseDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  return (
    <Container>
      <h1>영화 정보 입력</h1>

      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel>장르 선택</InputLabel>
        <Select value={genre} onChange={handleGenreChange} label='장르 선택'>
          <MenuItem value={'스릴러'}>스릴러</MenuItem>
          <MenuItem value={'로맨스'}>로맨스</MenuItem>
          <MenuItem value={'코믹'}>코믹</MenuItem>
          <MenuItem value={'액션'}>액션</MenuItem>
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='개봉일 입력'
          value={releaseDate}
          onChange={handleReleaseDateChange}
        />

        <DatePicker
          label='상영 종료일 입력'
          value={endDate}
          onChange={handleEndDateChange}
        />
      </LocalizationProvider>
      <Button variant='contained' color='primary'>
        <Link href='/'>목록으로 돌아가기</Link>
      </Button>
    </Container>
  );
}
