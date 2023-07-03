import './AddSthForm.scss'
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";

interface IAppPlayerForm {
  addSth: (name: string) => void
}

export default function AddPlayerForm({ addSth }: IAppPlayerForm) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim() !== '') {
      addSth(name);
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
