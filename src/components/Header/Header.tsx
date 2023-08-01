import { useState } from 'react';
import './Header.scss'
import AddSth from '../UI/AddSth/AddSth';
import PlayerInfo from './PlayerInfo/PlayerInfo';
import { useAppSelector } from '../../store/hooks/redux';
import { InputID, ModeID } from '../../enums';
import Button from '@mui/material/Button';
import { getProfile } from '../../api/getProfile';
import { useEffect } from "react";
import { Profile } from '../../types';

export default function Header() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [token, setToken] = useState<string | null>("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const players = useAppSelector((state) => state.players);
  const mode = useAppSelector((state) => state.mode);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const CLIENT_ID = 'a2d1920952a842d7b6a51caa84cc97f2';
  const REDIRECT_URI = 'http://localhost:5173/';
  const AUTORIZATION_URL = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';


  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((el) => el.startsWith("access_token"))
        ?.split("=")[1] as string;

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      // console.log(token);
      const fetchData = async () => {
        const profile = await getProfile();
        setProfile(profile);
      };
      fetchData();
    } else {
      setProfile(null);
    }
  }, [token])

  const logout = () => {
    setToken('');
    window.sessionStorage.removeItem("token");
  }


  return (
    <header>
      { mode === ModeID.constructor ? <AddSth toggleFormVisibility={toggleFormVisibility} addWhat={InputID.player} isFormVisible={isFormVisible} /> : null }

      <div className="players">
        {Object.values(players).map(item => <PlayerInfo key={item.name} name={item.name} points={item.points} />)}
      </div>

      <Button variant="contained" href={`${AUTORIZATION_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>{profile && profile.display_name ? profile.display_name : 'login'}</Button>
      <Button variant="contained" onClick={() => logout()}>logout</Button>
    </header>
  )
}
