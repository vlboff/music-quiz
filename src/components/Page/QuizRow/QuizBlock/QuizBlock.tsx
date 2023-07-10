import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

interface IQuizBlock {
  name: string,
  points: number;
  selectedBlock: { name: string, points: number } | null;
  handleBlockClick: (name: string, points: number) => void;
}

interface IBlockInfo {
  name: string,
  points: number;
  isActive: boolean;
  songID?: string;
}

export default function QuizBlock({ name, points, selectedBlock, handleBlockClick }: IQuizBlock) {
  const [blockInfo, setBlockInfo] = useState<IBlockInfo>({ name: name, points: points, isActive: false })

  useEffect(() => {
    if (selectedBlock?.name === name && selectedBlock.points === points && !blockInfo.isActive) {
      setBlockInfo((blockInfo) => ({ ...blockInfo, isActive: true }));
    } else {
      setBlockInfo((blockInfo) => ({ ...blockInfo, isActive: false }));
    }
  }, [selectedBlock]);

  return (
    <div className='quiz-block'>
      <Box
        onClick={() => handleBlockClick(name, points)}
        sx={{
          width: 170,
          height: 100,
          padding: 1,
          backgroundColor: `${blockInfo.isActive ? 'success' : 'primary'}.main`,
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
