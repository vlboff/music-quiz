import { useEffect, useState } from "react";
import { ModeID } from "../../enums";
import QuizRow from "./QuizRow/QuizRow";
import AddSth from "../UI/AddSth/AddSth";
import Button from "@mui/material/Button";
import AddSongModal from "../UI/Modals/AddSongModal";
import { useAppSelector } from "../../store/hooks/redux";
import { useAppDispatch } from "../../store/hooks/redux";
import { setMode } from "../../store/reducers/modeSlice";
import { InputID } from "../../enums";
import { ISection } from "../../types";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export default function Page() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isAddSongModalActive, setIsAddSongModalActive] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  const sections = useAppSelector((state) => state.sections);
  const players = useAppSelector((state) => state.players);
  const mode = useAppSelector((state) => state.mode);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const toggleMode = () => {
    dispatch(setMode(mode === ModeID.game ? ModeID.constructor : ModeID.game));
    closeDialog();
  };

  useEffect(() => {
    const isAllBlockFull = (sections: ISection) => {
      const sectionsArray = Object.values(sections).map((arr) =>
        arr.every((i) => i.previewUrl && i.previewUrl.length > 0)
      );
      return sectionsArray.every((i) => i === true);
    };

    if (
      Object.values(sections).length > 0 &&
      isAllBlockFull(sections) &&
      Object.values(players).length > 0
    ) {
      setIsStartButtonDisabled(false);
    } else {
      setIsStartButtonDisabled(true);
    }
  }, [sections, players]);

  return (
    <Box component="main" sx={{ p: 2, marginTop: 4, marginBottom: 20 }}>
      {Object.keys(sections).map((item) => (
        <QuizRow
          name={item}
          key={item}
          setIsAddSongModalActive={setIsAddSongModalActive}
        />
      ))}
      {mode === ModeID.constructor ? (
        <AddSth
          toggleFormVisibility={toggleFormVisibility}
          addWhat={InputID.section}
          isFormVisible={isFormVisible}
        />
      ) : null}
      <Button
        onClick={openDialog}
        variant="contained"
        disabled={isStartButtonDisabled}
        sx={{ minWidth: 170, marginTop: 9 }}
      >
        {mode === ModeID.game ? "new game" : "start quiz"}
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={closeDialog}>No</Button>
          <Button onClick={toggleMode} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <AddSongModal
        isAddSongModalActive={isAddSongModalActive}
        setIsAddSongModalActive={setIsAddSongModalActive}
      />
    </Box>
  );
}
