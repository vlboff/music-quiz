import './Modal.scss';
import AddSongModal from "./AddSongModal/AddSongModal";

interface IModal {
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Modal({ modalType, setModalType, isModalActive, setIsModalActive }: IModal) {


  return (
    <div className={`modal ${isModalActive ? 'active' : ''}`} onClick={() => setIsModalActive(false)}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        {isModalActive && modalType ? <AddSongModal /> : null}
      </div>
    </div>
  )
}
