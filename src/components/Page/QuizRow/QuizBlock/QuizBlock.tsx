import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

export interface IQuizBlock {
  name: string,
  points: number;
  isBlockSelected: { name: string, points: number } | null;
  handleBlockClick: (name: string, points: number) => void;
}

export default function QuizBlock({ name, points, isBlockSelected, handleBlockClick }: IQuizBlock) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (isBlockSelected?.name === name && isBlockSelected.points === points && !active) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [isBlockSelected]);

  return (
    <div className='quiz-block'>
      <Box
        onClick={() => handleBlockClick(name, points)}
        sx={{
          width: 170,
          height: 100,
          padding: 1,
          backgroundColor: `${active ? 'success' : 'primary'}.main`,
          borderRadius: 1,
          marginBottom: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Typography variant="body2" sx={{ color: 'white', fontSize: 24 }}>{points}</Typography>
      </Box>
    </div>
  )
}
