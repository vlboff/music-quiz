import { Profile } from "../types";

export async function getProfile(): Promise<Profile> {
  const accessToken = sessionStorage.getItem('token');

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data;
}