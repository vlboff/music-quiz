import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks/redux';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { setSelectedBlock } from '../../../../store/reducers/selectedBlockSlice';
import { IBlock } from '../../../../types';
import { ModeID } from '../../../../enums';

interface IQuizBlock {
  name: string,
  points: number;
  setIsAddSongModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuizBlock({ name, points, setIsAddSongModalActive }: IQuizBlock) {
  const [isBoxFull, setIsBoxFull] = useState(false)
  const [trackInfo, setTrackInfo] = useState<IBlock | null>(null)

  const sections = useAppSelector((state) => state.sections);
  const mode = useAppSelector((state) => state.mode);
  const selectedBlock = useAppSelector((state) => state.selectedBlock);

  const dispatch = useAppDispatch();

  const handleBlockClick = () => {
    dispatch(setSelectedBlock({name: name, points: points}))
    if (mode === ModeID.constructor) {
      setIsAddSongModalActive(true)
    }
  }

  useEffect(() => {
    if (selectedBlock?.name === name && selectedBlock.points === points) {
      const track = sections[selectedBlock.name].find(block => block.points === selectedBlock.points);
      if (track && track.previewUrl) {
        setIsBoxFull(true);
        setTrackInfo(track);
      } else {
        setTrackInfo(null);
      }
    }
  }, [sections]);

  useEffect(() => {
    if (Object.values(sections).length > 0) {
      const track = sections[name].find(block => block.points === points);
      if (track && track.previewUrl) {
        setIsBoxFull(true);
        setTrackInfo(track);
      } else {
        setTrackInfo(null);
      }
    }
  }, [])

  return (
    <div className='quiz-block'>
      <Box
        onClick={() => handleBlockClick()}
        sx={{
          displayPrint: 'flex',
          flexDirection: 'column',
          width: 170,
          height: 100,
          padding: 1,
          backgroundColor: `${isBoxFull ? 'primary.main' : 'white'}`,
          border: '1px solid #1976d2',
          borderRadius: 1,
          marginBottom: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Typography variant="h2" sx={{ color: `${isBoxFull ? 'white' : 'primary.main'}`, fontSize: 24 }}>{points}</Typography>
        {mode === ModeID.constructor ?
          isBoxFull ?
            <Typography variant="h2" sx={{ color: `white`, fontSize: 14 }}>{`${trackInfo?.authorName} - ${trackInfo?.trackName}`}</Typography> :
            null :
          null}
      </Box>
    </div>
  )
}
