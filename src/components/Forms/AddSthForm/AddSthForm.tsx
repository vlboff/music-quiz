import './AddSthForm.scss'
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";
import { ID } from '../../../types';
import { useAppDispatch } from '../../../store/hooks/redux';
import { addPlayer } from '../../../store/reducers/playersSlice';

interface IAppPlayerForm {
  addWhat: string
}

export default function AddPlayerForm({ addWhat }: IAppPlayerForm) {
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (name.trim() !== '' && addWhat === ID.player) {
      dispatch(addPlayer({ name: name, points: 0 }));
      setName('');
    }
  }
  return (
    <div className="player-form">
      <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Add</Button>
    </div>
  )
}
