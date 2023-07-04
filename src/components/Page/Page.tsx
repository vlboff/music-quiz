import './Page.scss'
import QuizRow from './QuizRow/QuizRow'
import { useEffect, useState } from 'react'
import AddSth from '../UI/AddSth/AddSth'
import Button from '@mui/material/Button';

interface ISection {
  name: string;
}

export default function Page() {
  const [sections, setSections] = useState<{ [key: string]: ISection }>({});
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isBlockSelected, setIsBlockSelected] = useState<{ name: string, points: number } | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addSection = (name: string) => {
    const newSection = { [name]: { name } };
    setSections((prevSections) => ({ ...prevSections, ...newSection }));
  };

  const deleteSection = (name: string) => {
    setSections(sections => {
      const currentSections = { ...sections };
      delete currentSections[name];
      return currentSections;
    });
  }

  const handleBlockClick = (name: string, points: number) => {
    setIsBlockSelected({ name: name, points: points });
  };

  useEffect(() => {
    if (Object.values(sections).length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [sections])

  return (
    <main>
      {Object.values(sections).map(item =>
        <QuizRow
          name={item.name}
          key={item.name}
          deleteSection={deleteSection}
          isBlockSelected={isBlockSelected}
          handleBlockClick={handleBlockClick}
        />)}
      <AddSth
        toggleFormVisibility={toggleFormVisibility}
        addWhat='section'
        isFormVisible={isFormVisible}
        addSth={addSection}
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
