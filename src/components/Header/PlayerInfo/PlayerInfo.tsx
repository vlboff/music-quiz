import './PlayerInfo.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import { IPlayer } from '../../../types';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from '../../../store/hooks/redux';
import { deletePlayer } from '../../../store/reducers/playersSlice';

export default function PlayerInfo({ name, points }: IPlayer) {
  const dispatch = useAppDispatch();

  return (
    <div className="player">
      <IconButton aria-label="delete" size="small" onClick={() => dispatch(deletePlayer(name))}>
        <CancelIcon color="error" />
      </IconButton>
      <div>{name}: {points}</div>
    </div>
  )
}
