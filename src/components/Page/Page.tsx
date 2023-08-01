import { useEffect, useState } from 'react'
import './Page.scss'
import { ModeID } from '../../enums'
import QuizRow from './QuizRow/QuizRow'
import AddSth from '../UI/AddSth/AddSth'
import Button from '@mui/material/Button';
import AddSongModal from '../UI/Modals/AddSongModal';
import { useAppSelector } from '../../store/hooks/redux';
import { useAppDispatch } from '../../store/hooks/redux';
import { setMode } from '../../store/reducers/modeSlice';
import { InputID } from '../../enums';
import { ISection } from '../../types';

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isAddSongModalActive, setIsAddSongModalActive] = useState(false);

  const dispatch = useAppDispatch();

  const sections = useAppSelector((state) => state.sections);
  const players = useAppSelector((state) => state.players);
  const mode = useAppSelector((state) => state.mode);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  useEffect(() => {
    const isAllBlockFull = (sections: ISection) => {
      const sectionsArray = Object.values(sections).map(arr => arr.every(i => i.previewUrl && i.previewUrl.length > 0))
      return sectionsArray.every(i => i === true);
    }

    if (Object.values(sections).length > 0 && isAllBlockFull(sections) && Object.values(players).length > 0) {
      setIsStartButtonDisabled(false);
    } else {
      setIsStartButtonDisabled(true);
    }
  }, [sections, players])

  return (
    <main>
      {Object.keys(sections).map(item =>
        <QuizRow
          name={item}
          key={item}
          setIsAddSongModalActive={setIsAddSongModalActive}
        />)}
      { mode === ModeID.constructor ?
        <AddSth
          toggleFormVisibility={toggleFormVisibility}
          addWhat={InputID.section}
          isFormVisible={isFormVisible}
        /> :
        null }
      <Button
        onClick={() => dispatch(setMode(mode === ModeID.game ? ModeID.constructor : ModeID.game))}
        variant="contained"
        disabled={isStartButtonDisabled}
        sx={{ minWidth: 170, marginTop: 9 }}
      >
        {mode === ModeID.game ? 'new game' : 'start quiz'}
      </Button>
      <AddSongModal
        isAddSongModalActive={isAddSongModalActive}
        setIsAddSongModalActive={setIsAddSongModalActive}
      />
    </main>
  )
}
