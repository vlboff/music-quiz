import { Search } from "../types";

export async function getSearch(query: string): Promise<Search> {
  const accessToken = sessionStorage.getItem('token');

  const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist%2Ctrack&market=BY&limit=10`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  const filteredTracks = data.tracks.items.filter((item: { preview_url: null; }) => item.preview_url !== null);
  return filteredTracks;
}