import Header from "./components/Header/Header";
import Page from "./components/Page/Page";
import PlayBar from "./components/PlayBar/PlayBar";
import { useAppSelector } from "./store/hooks/redux";
import { ModeID } from "./enums";

function App() {
  const mode = useAppSelector((state) => state.mode);
  return (
    <>
      <Header />
      <Page />
      { mode === ModeID.game ? <PlayBar /> : null}
    </>
  )
}

export default App
