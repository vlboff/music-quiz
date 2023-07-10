import './Modal.scss';
import AddSongModal from "./AddSongModal/AddSongModal";
import Box from '@mui/material/Box';

interface IModal {
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBlock: { name: string, points: number } | null;
}

export default function Modal({ modalType, setModalType, isModalActive, setIsModalActive, selectedBlock }: IModal) {


  return (
    <div className={`modal ${isModalActive ? 'active' : ''}`} onClick={() => setIsModalActive(false)}>
      <Box onClick={(e) => e.stopPropagation()}
        sx={{
          width: 300,
          height: 200,
          backgroundColor: 'white',
          borderRadius: 1,
          padding: 1,
        }}
      >
        {isModalActive && modalType ? <AddSongModal selectedBlock={selectedBlock} /> : null}
      </Box>
    </div>
  )
}
