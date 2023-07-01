import { useState } from 'react';
import './Header.scss'
import { IPlayer } from '../../App';
import AddSth from '../UI/AddSth/AddSth';


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
      <AddSth onClick={toggleFormVisibility} addWhat='player' isFormVisible={isFormVisible} addSth={addPlayer}/>

      <div className="players">
        {players.map(item => <div className="player" key={item.name}>{item.name}: {item.points}</div>)}
      </div>
    </header>
  )
}
