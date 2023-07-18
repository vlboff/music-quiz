import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks/redux';
import { IBlock } from '../../../../types';

interface IQuizBlock {
  name: string,
  points: number;
  selectedBlock: { name: string, points: number } | null;
  handleBlockClick: (name: string, points: number) => void;
}

// interface IBlockInfo {
//   name: string,
//   points: number;
//   isActive: boolean;
//   songID?: string;
// }

export default function QuizBlock({ name, points, selectedBlock, handleBlockClick }: IQuizBlock) {
  // const [blockInfo, setBlockInfo] = useState<IBlockInfo>({ name: name, points: points, isActive: false })
  const [constructorModeActive, setConstructorModeActive] = useState(false)
  const [trackInfo, setTrackInfo] = useState<IBlock | null>(null)

  const sections = useAppSelector((state) => state.sections);

  useEffect(() => {
    if(selectedBlock?.name === name && selectedBlock.points === points) {
      const track = sections[selectedBlock.name].find(block => block.points === selectedBlock.points);
    if (track && track.previewUrl) {
      setConstructorModeActive(true);
      setTrackInfo(track);
    } else {
      setTrackInfo(null);
    }
  }
  }, [sections])

  // useEffect(() => {
  //   if (selectedBlock?.name === name && selectedBlock.points === points && !blockInfo.isActive) {
  //     setBlockInfo((blockInfo) => ({ ...blockInfo, isActive: true }));
  //   } else {
  //     setBlockInfo((blockInfo) => ({ ...blockInfo, isActive: false }));
  //   }
  // }, [selectedBlock]);

  return (
    <div className='quiz-block'>
      <Box
        onClick={() => handleBlockClick(name, points)}
        sx={{
          displayPrint: 'flex',
          flexDirection: 'column',
          width: 170,
          height: 100,
          padding: 1,
          // backgroundColor: `${blockInfo.isActive ? 'success' : 'primary'}.main`,
          backgroundColor: `${constructorModeActive ? 'primary.main' : 'white'}`,
          border: '1px solid #1976d2',
          borderRadius: 1,
          marginBottom: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Typography variant="h2" sx={{ color: `${constructorModeActive ? 'white' : 'primary.main'}`, fontSize: 24 }}>{points}</Typography>
        {constructorModeActive ? <Typography variant="h2" sx={{ color: `white`, fontSize: 14 }}>{`${trackInfo?.authorName} - ${trackInfo?.trackName}`}</Typography> : null}
      </Box>
    </div>
  )
}
