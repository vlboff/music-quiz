import './AddSongModal.scss';
import Box from '@mui/material/Box';
import Input from "@mui/material/Input";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../utils";
import { getSearch } from '../../../api/getSearch';
import { Item } from '../../../types';
import { useAppDispatch } from '../../../store/hooks/redux';
import { addBlockInfo } from '../../../store/reducers/sectionsSlice'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface IModal {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  selectedBlock: { name: string, points: number } | null;
}

export default function Modal({ isModalActive, setIsModalActive, selectedBlock }: IModal) {
  const [name, setName] = useState('');
  const [serchedItems, setSerchedItems] = useState<Item[] | null>(null);

  const dispatch = useAppDispatch();

  const delayedSearch = useMemo(() => debounce((searchValue: string) => {
    const fetchData = async () => {
      const items = await getSearch(searchValue);
      setSerchedItems(items);
    };
    fetchData();
  }, 1000), []);

  useEffect(() => {
    if (name.length > 0) {
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
          minHeight: 200,
          backgroundColor: 'white',
          borderRadius: 1,
          padding: 1,
        }}
      >
        <Input placeholder="search song" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          mt={2}
        >
          {serchedItems ? serchedItems.map(i =>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  addBlockInfo({
                    sectionName: selectedBlock?.name ? selectedBlock?.name : '',
                    block: {
                      points: selectedBlock?.points ? selectedBlock?.points : 0,
                      authorName: i.artists[0].name,
                      trackName: i.name,
                      trackID: i.id,
                      previewUrl: i.preview_url,
                    },
                  })
                );
                setIsModalActive(false);
              }}
              key={i.id}>
              {`${i.artists[0].name} - ${i.name}`}
            </Button>) : null}
        </Stack>

      </Box>
    </div>
  )
}
