import './Page.scss'
import QuizRow from './QuizRow/QuizRow'
import { useState } from 'react'
import AddSth from '../UI/AddSth/AddSth'

interface ISection {
  name: string;
}

export default function Page() {
  const [sections, setSections] = useState<{ [key: string]: ISection }>({});
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  return (
    <main>
      {Object.values(sections).map(item => <QuizRow name={item.name} key={item.name} deleteSection={deleteSection} />)}
      <AddSth onClick={toggleFormVisibility} addWhat='section' isFormVisible={isFormVisible} addSth={addSection} />
    </main>
  )
}
