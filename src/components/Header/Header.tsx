import { useState } from 'react';
import './Header.scss'
import { IPlayer } from '../../App';
import AddSth from '../UI/AddSth/AddSth';
import PlayerInfo from './PlayerInfo/PlayerInfo';

interface IHeader {
  players: { [key: string]: IPlayer };
  setPlayers: React.Dispatch<React.SetStateAction<{ [key: string]: IPlayer }>>;
}

export default function Header({players, setPlayers}: IHeader) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const addPlayer = (name: string) => {
    const newPlayer = { [name]: { name: name, points: 0 } };
    setPlayers((players) => ({ ...players, ...newPlayer } as { [key: string]: IPlayer }));
  }

  const  deletePlayer = (name: string) => {
    setPlayers(players => {
      const currentPlayers = { ...players };
      delete currentPlayers[name];
      return currentPlayers;
    });
  }
  return (
    <header>
      <AddSth onClick={toggleFormVisibility} addWhat='player' isFormVisible={isFormVisible} addSth={addPlayer}/>

      <div className="players">
        {Object.values(players).map(item => <PlayerInfo key={item.name} name={item.name} points={item.points} deletePlayer={deletePlayer}/>)}
      </div>
    </header>
  )
}
