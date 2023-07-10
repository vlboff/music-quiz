import Input from "@mui/material/Input";
import { useState } from "react";

interface IAddSongModal {
  selectedBlock: { name: string, points: number } | null;
}

export default function AddSongModal({ selectedBlock }: IAddSongModal) {
  const [name, setName] = useState('')
  return (
    <div>
      <Input placeholder="search song" type="text" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  )
}
