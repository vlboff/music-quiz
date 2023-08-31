import "./PlayBar.scss";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import Paper from "@mui/material/Paper";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
}));

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function PlayBar() {
  const theme = useTheme();
  const duration = 200; // seconds
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";

  const [position, setPosition] = useState(32);
  const [paused, setPaused] = useState(true);
  const [audioSrc, setAudioSrc] = useState<string | null | undefined>("");

  const sections = useAppSelector((state) => state.sections);
  const selectedBlock = useAppSelector((state) => state.selectedBlock);

  const audio = document.querySelector("audio") as HTMLAudioElement;

  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };

  const PlayPauseAudio = () => {
    setPaused(!paused);
    if (audio && paused) {
      audio.play();
    }
    if (audio && !paused) {
      audio.pause();
    }
  };

  useEffect(() => {
    if (selectedBlock.name && selectedBlock.points) {
      setAudioSrc(
        sections[selectedBlock.name].find(
          (section) => section.points === selectedBlock.points
        )?.previewUrl
      );
    }
  }, [selectedBlock]);

  return (
    <Paper
      sx={{
        width: "100%",
        position: "fixed",
        zIndex: 100,
        left: 0,
        bottom: 0,
        backgroundColor: "#ffffff",
      }}
    >
      <Widget>
        {/* <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value as number)}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        /> */}
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton
            aria-label={paused ? "play" : "pause"}
            sx={{
              boxShadow:
                "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
            }}
            onClick={() => PlayPauseAudio()}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
        </Box>
        {/* <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack> */}
      </Widget>
      <audio
        src={audioSrc ? audioSrc : ""}
        onEnded={() => setPaused(true)}
      ></audio>
    </Paper>
  );
}
