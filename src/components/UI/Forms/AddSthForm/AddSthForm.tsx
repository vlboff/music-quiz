import "./AddSthForm.scss";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useState } from "react";
import { InputID } from "../../../../enums";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { addPlayer } from "../../../../store/reducers/playersSlice";
import { addSection } from "../../../../store/reducers/sectionsSlice";

interface IAppPlayerForm {
  addWhat: string;
}

export default function AddPlayerForm({ addWhat }: IAppPlayerForm) {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (name.trim() !== "" && addWhat === InputID.player) {
      dispatch(addPlayer({ name: name, points: 0 }));
      setName("");
    }
    if (name.trim() !== "" && addWhat === InputID.section) {
      dispatch(
        addSection({
          name,
          blocks: [
            {
              points: 100,
              authorName: null,
              trackName: null,
              trackID: null,
              previewUrl: null,
              winner: null,
            },
            {
              points: 200,
              authorName: null,
              trackName: null,
              trackID: null,
              previewUrl: null,
              winner: null,
            },
            {
              points: 300,
              authorName: null,
              trackName: null,
              trackID: null,
              previewUrl: null,
              winner: null,
            },
            {
              points: 400,
              authorName: null,
              trackName: null,
              trackID: null,
              previewUrl: null,
              winner: null,
            },
            {
              points: 500,
              authorName: null,
              trackName: null,
              trackID: null,
              previewUrl: null,
              winner: null,
            },
          ],
        })
      );
      setName("");
    }
  };
  return (
    <div className="player-form">
      <Input
        placeholder="Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
}
