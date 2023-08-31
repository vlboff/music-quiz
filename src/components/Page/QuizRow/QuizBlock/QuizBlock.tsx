import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../store/hooks/redux";
import { useAppDispatch } from "../../../../store/hooks/redux";
import { setSelectedBlock } from "../../../../store/reducers/selectedBlockSlice";
import { addWinner } from "../../../../store/reducers/sectionsSlice";
import { addPlayersPoints } from "../../../../store/reducers/playersSlice";
import { IBlock } from "../../../../types";
import { ModeID } from "../../../../enums";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip } from "@mui/material";

interface IQuizBlock {
  name: string;
  points: number;
  setIsAddSongModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuizBlock({
  name,
  points,
  setIsAddSongModalActive,
}: IQuizBlock) {
  const [isBoxFull, setIsBoxFull] = useState(false);
  const [isBoxSelected, setIsBoxSelected] = useState(false);
  const [trackInfo, setTrackInfo] = useState<IBlock | null>(null);
  const [winner, setWinner] = useState<string>("");
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const players = useAppSelector((state) => state.players);
  const sections = useAppSelector((state) => state.sections);
  const mode = useAppSelector((state) => state.mode);
  const selectedBlock = useAppSelector((state) => state.selectedBlock);

  const dispatch = useAppDispatch();

  const handleBlockClick = () => {
    dispatch(setSelectedBlock({ name: name, points: points }));
    if (mode === ModeID.constructor) {
      setIsAddSongModalActive(true);
    }
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (mode === ModeID.game) {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      setIsContextMenuOpen(true);
    }
  };

  const handleContextMenuClose = (winner: string) => {
    if (mode === ModeID.game) {
      setWinner(winner);
      dispatch(addWinner({ winner, name, points }));
      setAnchorEl(null);
      setIsContextMenuOpen(false);
    }
  };

  const result = () => {
    const allPlayers = Object.values(players);
    for (let i = 0; i < allPlayers.length; i++) {
      const winPlayer = Object.values(sections).map((section) =>
        section.filter((block) => block.winner === allPlayers[i].name)
      );

      const pointsArr = winPlayer.map((section) =>
        section.reduce((sum, current) => sum + current.points, 0)
      );
      const points = pointsArr.reduce((sum, current) => sum + current, 0);
      dispatch(addPlayersPoints({ name: allPlayers[i].name, points }));
    }
    // const winnersOnly = Object.values(sections).map((section) =>
    //   section.filter((block) => block.winner === winner && winner.length > 0)
    // );
    // const pointsArr = winnersOnly.map((section) =>
    //   section.reduce((sum, current) => sum + current.points, 0)
    // );
    // const points = pointsArr.reduce((sum, current) => sum + current, 0);
    // console.log(winnersOnly);
    // dispatch(addPlayersPoints({ name: winner, points }));
  };

  const bgColor = () => {
    if (mode === ModeID.game && winner.length > 0) {
      return "secondary.main";
    } else if (isBoxFull) {
      if (isBoxSelected) {
        return "info.dark";
      } else {
        return "primary.main";
      }
    } else {
      return "white";
    }
  };

  useEffect(() => {
    if (selectedBlock?.name === name && selectedBlock.points === points) {
      const track = sections[selectedBlock.name].find(
        (block) => block.points === selectedBlock.points
      );
      if (track && track.previewUrl) {
        setIsBoxFull(true);
        setTrackInfo(track);
      } else {
        setTrackInfo(null);
      }
      if (mode === ModeID.game) {
        result();
      }
    }
    // console.log(sections);
  }, [sections]);

  useEffect(() => {
    if (Object.values(sections).length > 0) {
      const track = sections[name].find((block) => block.points === points);
      if (track && track.previewUrl) {
        setIsBoxFull(true);
        setTrackInfo(track);
      } else {
        setTrackInfo(null);
      }
    }
  }, []);

  useEffect(() => {
    if (
      selectedBlock?.name === name &&
      selectedBlock.points === points &&
      ModeID.game
    ) {
      setIsBoxSelected(true);
    } else {
      setIsBoxSelected(false);
    }
  }, [selectedBlock]);

  return (
    <div className="quiz-block">
      <Tooltip
        title={
          mode === ModeID.game && winner.length > 0
            ? `${trackInfo?.authorName} - ${trackInfo?.trackName}`
            : null
        }
        placement="top"
      >
        <Box
          onClick={() => handleBlockClick()}
          onContextMenu={(e) => handleContextMenu(e)}
          sx={{
            displayPrint: "flex",
            flexDirection: "column",
            width: 170,
            height: 100,
            padding: 1,
            backgroundColor: bgColor(),
            boxShadow: "2px 2px 4px 0px rgba(34, 60, 80, 0.2)",
            borderRadius: 1,
            marginBottom: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: `${isBoxFull ? "white" : "primary.main"}`,
              fontSize: 24,
            }}
          >
            {points}
          </Typography>

          {mode === ModeID.constructor ? (
            isBoxFull ? (
              <Typography
                variant="h2"
                sx={{ color: `white`, fontSize: 14 }}
              >{`${trackInfo?.authorName} - ${trackInfo?.trackName}`}</Typography>
            ) : null
          ) : null}

          {mode === ModeID.game && winner.length > 0 ? (
            <Typography
              sx={{
                color: "white",
                fontSize: 14,
              }}
            >
              {winner}
            </Typography>
          ) : null}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isContextMenuOpen}
            onClose={() => setIsContextMenuOpen(false)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleContextMenuClose("")}>
              <em>None</em>
            </MenuItem>
            {Object.values(players).map((item) => (
              <MenuItem
                key={item.name}
                onClick={() => handleContextMenuClose(item.name)}
              >
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Tooltip>
    </div>
  );
}
