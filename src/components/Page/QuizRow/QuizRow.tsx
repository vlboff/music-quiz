import './QuizRow.scss'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QuizBlock from './QuizBlock/QuizBlock';
import { useAppDispatch } from '../../../store/hooks/redux';
import { deleteSection } from '../../../store/reducers/sectionsSlice';

interface IQuizRow {
  name: string;
  isBlockSelected: { name: string, points: number } | null;
  handleBlockClick: (name: string, points: number) => void;
}


const QUIZ_BLOCK_ARRAY: number[] = [100, 200, 300, 400, 500];

export default function QuizRow({ name, isBlockSelected, handleBlockClick }: IQuizRow) {
  const dispatch = useAppDispatch();

  return (
    <div className="quiz-row">
      <div className="quiz-row_head">
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
          <Typography variant="body2" sx={{ color: 'white', wordBreak: 'break-all', fontSize: 16 }}>{name}</Typography>
        </Box>
        <div className="quiz-row__control">
          <Button
            className='quiz-row__control_delete-button'
            onClick={() => dispatch(deleteSection(name))}
            color="error"
            variant="contained"
            sx={{
              width: 170,
            }}>
            <ArrowBackIosIcon />
          </Button>
        </div>
      </div>
      <div className="quiz-row_body">
        {QUIZ_BLOCK_ARRAY.map(item =>
          <QuizBlock
            key={name + item}
            name={name}
            points={item}
            isBlockSelected={isBlockSelected}
            handleBlockClick={handleBlockClick}
          />)}
      </div>
    </div>
  )
}
