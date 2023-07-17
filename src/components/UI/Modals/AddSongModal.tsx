import './AddSongModal.scss';
import Box from '@mui/material/Box';
import Input from "@mui/material/Input";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils";
import { getSearch } from '../../../api/getSearch';
import { Item } from '../../../types';

interface IModal {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBlock: { name: string, points: number } | null;
}

export default function Modal({ isModalActive, setIsModalActive, selectedBlock }: IModal) {
  const [name, setName] = useState('');
  const [serchedItems, setSerchedItems] = useState<Item[] | null>(null);

  const delayedSearch = useMemo(() => debounce((searchValue: string) => {
    const fetchData = async () => {
      const items = await getSearch(searchValue);
      setSerchedItems(items);
    };
    fetchData();
  }, 1000), []);

  useEffect(() => {
    if(name.length > 0) {
      delayedSearch(name);
    } else {
      setSerchedItems(null);
    }
  }, [name, delayedSearch])

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
        <Input placeholder="search song" type="text" value={name} onChange={ (e) => setName(e.target.value) } />
        { serchedItems ? serchedItems.map(i => <p key={i.id}>{i.name}</p>) : null}
      </Box>
    </div>
  )
}
