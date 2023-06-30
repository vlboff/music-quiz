import './AddPlayerForm.scss'
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";

interface IAppPlayerForm {
  addPlayer: (name:string) => void
}

export default function AddPlayerForm({addPlayer}: IAppPlayerForm) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      addPlayer(name);
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
