import { useState } from 'react';
import './Header.scss'
import AddPlayerForm from '../Forms/AddPlayerForm/AddPlayerForm';
import { IPlayer } from '../../App';
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface IHeader {
  players: IPlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}

export default function Header({players, setPlayers}: IHeader) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addPlayer = (name: string) => {
    setPlayers([...players, {name: name, points: 0}])
  }

  return (
    <header>
      <div className="add-player">
        <Button onClick={toggleFormVisibility} variant="contained" size="large" color={isFormVisible ? "error":"primary"} endIcon={isFormVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
          {isFormVisible ? "Hide input":"Add player"}
        </Button>

        {isFormVisible && <AddPlayerForm addPlayer={addPlayer}/>}
      </div>

      <div className="players">
        {players.map(item => <div className="player" key={item.name}>{item.name}: {item.points}</div>)}
      </div>
    </header>
  )
}
