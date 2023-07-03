import './PlayerInfo.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import { IPlayer } from '../../../App';
import IconButton from '@mui/material/IconButton';

interface IPlayerInfo extends IPlayer {
  deletePlayer: (name: string) => void;
}

export default function PlayerInfo({name, points, deletePlayer}: IPlayerInfo) {
  return (
    <div className="player">
      <IconButton aria-label="delete" size="small" onClick={() => deletePlayer(name)}>
        <CancelIcon color="error"/>
      </IconButton>
      <div>{name}: {points}</div>
    </div>
  )
}
