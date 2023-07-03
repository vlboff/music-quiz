import './AddSth.scss'
import Button from '@mui/material/Button';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddSthForm from '../../Forms/AddSthForm/AddSthForm';

interface IAddSth {
  isFormVisible: boolean;
  addSth: (name: string) => void;
  onClick: () => void;
  addWhat: string;
}

export default function AddSth({ isFormVisible, addSth, onClick, addWhat }: IAddSth) {
  return (
    <div className="add-sth">
      <Button
        onClick={onClick}
        className='add-sth_button'
        variant="contained"
        color={isFormVisible ? "error" : "primary"}
        endIcon={isFormVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{ minWidth: 170 }}
      >
        {isFormVisible ? "Hide input" : `Add ${addWhat}`}
      </Button>

      {isFormVisible && <AddSthForm addSth={addSth} />}
    </div>
  )
}
