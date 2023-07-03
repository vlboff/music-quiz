import { useState } from "react"
import Header from "./components/Header/Header"
import Page from "./components/Page/Page"

export interface IPlayer {
  name: string;
  points: 0;
}

function App() {
  const [players, setPlayers] = useState<{ [key: string]: IPlayer }>({});

  return (
    <>
    <Header players={players} setPlayers={setPlayers}/>
    <Page />
    </>
  )
}

export default App
