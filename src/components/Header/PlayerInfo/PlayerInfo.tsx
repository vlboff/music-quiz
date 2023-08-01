import './PlayerInfo.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import { IPlayer } from '../../../types';
import { ModeID } from '../../../enums';
import IconButton from '@mui/material/IconButton';
import { useAppSelector } from '../../../store/hooks/redux';
import { useAppDispatch } from '../../../store/hooks/redux';
import { deletePlayer } from '../../../store/reducers/playersSlice';

export default function PlayerInfo({ name, points }: IPlayer) {
  const dispatch = useAppDispatch();

  const mode = useAppSelector((state) => state.mode);

  return (
    <div className="player">
      {mode === ModeID.constructor ?
      <IconButton aria-label="delete" size="small" onClick={() => dispatch(deletePlayer(name))}>
        <CancelIcon color="error" />
      </IconButton> :
      null}
      <div>{name}: {points}</div>
    </div>
  )
}
