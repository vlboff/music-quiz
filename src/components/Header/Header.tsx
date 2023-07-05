import { useState } from 'react';
import './Header.scss'
import AddSth from '../UI/AddSth/AddSth';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import { useAppSelector } from '../../store/hooks/redux';
import { ID } from '../../types';

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const players = useAppSelector((state) => state.players);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <header>
      <AddSth toggleFormVisibility={toggleFormVisibility} addWhat={ID.player} isFormVisible={isFormVisible} />

      <div className="players">
        {Object.values(players).map(item => <PlayerInfo key={item.name} name={item.name} points={item.points} />)}
      </div>
    </header>
  )
}
