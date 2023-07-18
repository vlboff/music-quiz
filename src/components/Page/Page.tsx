import { useEffect, useState } from 'react'
import './Page.scss'
import QuizRow from './QuizRow/QuizRow'
import AddSth from '../UI/AddSth/AddSth'
import Button from '@mui/material/Button';
import AddSongModal from '../UI/Modals/AddSongModal';
import { useAppSelector } from '../../store/hooks/redux';
import { InputID } from '../../enums';
import { ISection } from '../../types';

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<{ name: string, points: number } | null>(null);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const sections = useAppSelector((state) => state.sections);
  const players = useAppSelector((state) => state.players);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleBlockClick = (name: string, points: number) => {
    setSelectedBlock({ name: name, points: points });
    setIsModalActive(true);
  };

  useEffect(() => {
    const isAllBlockFull = (sections: ISection) => {
      const sectionsArray = Object.values(sections).map(arr => arr.every(i => i.previewUrl && i.previewUrl.length > 0))
      return sectionsArray.every(i => i === true);
    }

    if (isAllBlockFull(sections) && Object.values(players).length > 0) {
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
          selectedBlock={selectedBlock}
          handleBlockClick={handleBlockClick}
        />)}
      <AddSth
        toggleFormVisibility={toggleFormVisibility}
        addWhat={InputID.section}
        isFormVisible={isFormVisible}
      />
      <Button
        variant="contained"
        disabled={isStartButtonDisabled}
        sx={{ minWidth: 170, marginTop: 9 }}
      >
        {isQuizStarted ? 'new game' : 'start quiz'}
      </Button>
      <AddSongModal
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        selectedBlock={selectedBlock}
      />
    </main>
  )
}
