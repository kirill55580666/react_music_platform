import React, {useEffect, useRef, useState} from 'react';
import { ITrack } from '../types/tracks';
// @ts-ignore
import {Card} from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import {Grid, IconButton } from '../node_modules/@mui/material/index';
// @ts-ignore
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// @ts-ignore
import PauseIcon from '@mui/icons-material/Pause';
import { Delete } from '../node_modules/@mui/icons-material/index';
// @ts-ignore
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {NextThunkDispatch} from "../store/index";
import {deleteTrack} from "../store/action-creators/track";

interface TrackItemProps {
    track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({track}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()
    const dispatch = useDispatch() as NextThunkDispatch
    const [trackDuration, setTrackDuration] = useState(null)

    const play = (e) => {
        e.stopPropagation()
        if (active !== track) {
            setActiveTrack(track)
            playTrack()
            //audio.play()
        }
    }

    const deleteButtonTrack = async (e) => {
        e.stopPropagation()
        const id = track._id
        await dispatch(await deleteTrack(id))
    }

    const {active, duration, currentTime, pause} = useTypedSelector(state => state.player)

    useEffect(() => {
        const  audio = new Audio()
        audio.src = 'http://localhost:5000/'+ track?.audio
        audio.onloadedmetadata = () => {
            setTrackDuration(Math.ceil(audio.duration))
        }
    }, [])

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {(active === track) && !pause
                    ? <PauseIcon/>
                    : <PlayArrowIcon/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <div>
                {active === track?
                    <span>{currentTime} / {duration}</span>
                    :
                    <span>0 / {trackDuration}</span>
                }
            </div>
            <IconButton onClick={deleteButtonTrack} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;