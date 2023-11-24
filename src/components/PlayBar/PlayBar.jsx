import style from "./playBar.module.scss"
import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import { IconButton, Slider } from "@mui/material";
import { Pause, PlayArrow, VolumeUp, VolumeMute } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const VolumeControl = () => {
    const {audio} = useContext(AudioContext);

    const [audioVolume, setAudioVolume] = useState(0.01);

    const handleChangeVolume = (value) => {
        if (audioVolume - value <= 0) {
            setAudioVolume(value);
            audio.volume = value;
        }
        else {
            setAudioVolume(value);
            audio.volume = value;
        }
    };

    const audioVolumeSlider = Math.round(audioVolume * 100);

    return (
        <>
            {audioVolume > 0 ? <VolumeUp/> : <VolumeMute/>}
            <Slider step={0.01} min={0} max={1} defaultValue={0.01} value={audioVolume} onChange={(_, value) => handleChangeVolume(value)}/>
            <p>{audioVolumeSlider}</p>
        </>
    );
};

const TimeControls = () => {
    const {audio, currentTrack} = useContext(AudioContext);

    const {duration} = currentTrack;

    const [currentTime, setCurrentTime] = useState(0);

    const sliderCurrentTime = Math.round((currentTime / duration) * 100);

    const formatCurrentTime = secondsToMMSS(currentTime);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setCurrentTime(audio.currentTime);
        }, 1000);

        return () => {
            clearInterval(timeInterval);
        };
    }, []);

    const handleChangeCurrentTime = (_, value) => {
        const time = Math.round((value / 100) * duration);

        setCurrentTime(time);
        audio.currentTime = time;
    };

    return (
        <>
            <p>{formatCurrentTime}</p>
            <Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handleChangeCurrentTime}/>
        </>
    );
};

const PlayBar = () => {
    const {audio, currentTrack, handleToggleAudio, isPlaying} = useContext(AudioContext);

    const {title, artists, preview, duration} = currentTrack;
    
    const formatDuration = secondsToMMSS(duration);

    return(
        <div className={style.playbar}>
            <img className={style.preview} src={preview}></img>
            <IconButton onClick={() => handleToggleAudio(currentTrack)}>
                {isPlaying ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <div className={style.credits}>
                <h4>{title}</h4>
                <p>{artists}</p>
            </div>
            <div className={style.slider}>
                <TimeControls/>
                <p>{formatDuration}</p>
            </div>
            <div className={style.slider}>
                <VolumeControl/>
            </div>
        </div>
    );
};

export default PlayBar;