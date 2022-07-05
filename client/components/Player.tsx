import React, {useEffect} from 'react';
// @ts-ignore
import PauseIcon from "@mui/icons-material/Pause";
// @ts-ignore
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// @ts-ignore
import {IconButton} from "@mui/material";
import styles from '../styles/Player.module.scss'
// @ts-ignore
import Grid from "@mui/material/Grid";
import {ITrack} from "../types/tracks";
import TrackProgress from "./TrackProgress";
// @ts-ignore
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

let audio

const Player = () => {
    const {pause, active, volume, duration, currentTime} = useTypedSelector(state => state.player)

    const {pauseTrack, playTrack, setActiveTrack, setCurrentTime, setDuration, setVolume} = useActions()

    const play = () => {
        if(pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    useEffect(() => {
        if(!audio) {
            audio = new Audio()
        } else {
            setAudio(audio)
            play()
        }
    }, [active])

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentTime = Number(e.target.value)
        setCurrentTime(currentTime)
        audio.currentTime = currentTime
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentVolume = Number(e.target.value)
        setVolume(currentVolume)
        audio.volume = currentVolume / 100
    }

    const setAudio = (audio) => {
        if(active) {
            audio.src = 'http://localhost:5000/'+ active?.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <PauseIcon/>
                    : <PlayArrowIcon/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUpIcon style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;