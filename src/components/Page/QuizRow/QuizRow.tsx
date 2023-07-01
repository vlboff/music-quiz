import './QuizRow.scss'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface IQuizRow {
  name: string;
  deleteSection: (name: string) => void;
}

export default function QuizRow({name, deleteSection}: IQuizRow) {
  return (
    <div className="quiz-row">
      <div className="quiz-row__head">
        <Box
          sx={{
            width: 170,
            height: 100,
            padding: 1,
            backgroundColor: 'primary.main',
            borderRadius: 1,
            marginBottom: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Typography variant="body2" sx={{ color: 'white', wordBreak: 'break-all' }}>{name}</Typography>
        </Box>
        <div className="quiz-row__control">
          <Button onClick={() => deleteSection(name)} color="error" variant="contained" className='quiz-row__control_delete-button'>
            <ArrowBackIosIcon />
          </Button>
          <Button variant="contained" className='quiz-row__control_add-button'>
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
