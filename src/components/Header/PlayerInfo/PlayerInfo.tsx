import { IPlayer } from "../../../types";
import { ModeID } from "../../../enums";
import { useAppSelector } from "../../../store/hooks/redux";
import { useAppDispatch } from "../../../store/hooks/redux";
import { deletePlayer } from "../../../store/reducers/playersSlice";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

export default function PlayerInfo({ name, points }: IPlayer) {
  const dispatch = useAppDispatch();

  const mode = useAppSelector((state) => state.mode);

  return (
    <Stack direction="row" alignItems="center">
      {mode === ModeID.constructor ? (
        <Chip
          sx={{ fontSize: 16 }}
          label={`${name}: ${points}`}
          onDelete={() => dispatch(deletePlayer(name))}
        />
      ) : (
        <Chip
          sx={{ fontSize: 16 }}
          label={`${name}: ${points}`}
          variant="outlined"
        />
      )}
    </Stack>
  );
}
