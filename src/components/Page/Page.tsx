import './Page.scss'
import QuizRow from './QuizRow/QuizRow'
import { useEffect, useState } from 'react'
import AddSth from '../UI/AddSth/AddSth'
import Button from '@mui/material/Button';
import { useAppSelector } from '../../store/hooks/redux';
import { ID } from '../../types';

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBlockSelected, setIsBlockSelected] = useState<{ name: string, points: number } | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const sections = useAppSelector((state) => state.sections);
  const players = useAppSelector((state) => state.players);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleBlockClick = (name: string, points: number) => {
    setIsBlockSelected({ name: name, points: points });
  };

  useEffect(() => {
    if (Object.values(sections).length > 0 && Object.values(players).length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [sections, players])

  return (
    <main>
      {Object.values(sections).map(item =>
        <QuizRow
          name={item.name}
          key={item.name}
          isBlockSelected={isBlockSelected}
          handleBlockClick={handleBlockClick}
        />)}
      <AddSth
        toggleFormVisibility={toggleFormVisibility}
        addWhat={ID.section}
        isFormVisible={isFormVisible}
      />
      <Button
        variant="contained"
        disabled={isButtonDisabled}
        sx={{ minWidth: 170, marginTop: 9 }}
      >
        {isQuizStarted ? 'new game' : 'start quiz'}
      </Button>
    </main>
  )
}
