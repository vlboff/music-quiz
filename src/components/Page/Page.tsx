import { useEffect, useState } from 'react'
import './Page.scss'
import QuizRow from './QuizRow/QuizRow'
import AddSth from '../UI/AddSth/AddSth'
import Button from '@mui/material/Button';
import Modal from '../UI/Modals/Modal';
import { useAppSelector } from '../../store/hooks/redux';
import { ID, TypesOfModal } from '../../types';

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<{ name: string, points: number } | null>(null);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const sections = useAppSelector((state) => state.sections);
  const players = useAppSelector((state) => state.players);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleBlockClick = (name: string, points: number) => {
    setSelectedBlock({ name: name, points: points });
    setIsModalActive(true);
    setModalType(TypesOfModal.addSong);
  };

  useEffect(() => {
    if (Object.values(sections).length > 0 && Object.values(players).length > 0) {
      setIsStartButtonDisabled(false);
    } else {
      setIsStartButtonDisabled(true);
      console.log(sections);
    }
  }, [sections, players])

  return (
    <main>
      {Object.values(sections).map(item =>
        <QuizRow
          name={item.name}
          key={item.name}
          selectedBlock={selectedBlock}
          handleBlockClick={handleBlockClick}
        />)}
      <AddSth
        toggleFormVisibility={toggleFormVisibility}
        addWhat={ID.section}
        isFormVisible={isFormVisible}
      />
      <Button
        variant="contained"
        disabled={isStartButtonDisabled}
        sx={{ minWidth: 170, marginTop: 9 }}
      >
        {isQuizStarted ? 'new game' : 'start quiz'}
      </Button>
      <Modal
        modalType={modalType}
        setModalType={setModalType}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        selectedBlock={selectedBlock}
      />
    </main>
  )
}
